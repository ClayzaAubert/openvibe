import { Config, ConfigProvider, Context, Effect, Layer, Option } from "effect"
import { ConfigService } from "@/effect/config-service"

const bool = (name: string) => Config.boolean(name).pipe(Config.withDefault(false))
const positiveInteger = (name: string) =>
  Config.number(name).pipe(
    Config.map((value) => (Number.isInteger(value) && value > 0 ? value : undefined)),
    Config.orElse(() => Config.succeed(undefined)),
  )
const experimental = bool("OPENVIBE_EXPERIMENTAL")
const enabledByExperimental = (name: string) =>
  Config.all({ experimental, enabled: Config.boolean(name).pipe(Config.option) }).pipe(
    Config.map((flags) => Option.getOrElse(flags.enabled, () => flags.experimental)),
  )

export class Service extends ConfigService.Service<Service>()("@openvibe/RuntimeFlags", {
  autoShare: bool("OPENVIBE_AUTO_SHARE"),
  pure: bool("OPENVIBE_PURE"),
  disableDefaultPlugins: bool("OPENVIBE_DISABLE_DEFAULT_PLUGINS"),
  disableEmbeddedWebUi: bool("OPENVIBE_DISABLE_EMBEDDED_WEB_UI"),
  disableExternalSkills: bool("OPENVIBE_DISABLE_EXTERNAL_SKILLS"),
  disableLspDownload: bool("OPENVIBE_DISABLE_LSP_DOWNLOAD"),
  disableClaudeCodePrompt: Config.all({
    broad: bool("OPENVIBE_DISABLE_CLAUDE_CODE"),
    direct: bool("OPENVIBE_DISABLE_CLAUDE_CODE_PROMPT"),
  }).pipe(Config.map((flags) => flags.broad || flags.direct)),
  disableClaudeCodeSkills: Config.all({
    broad: bool("OPENVIBE_DISABLE_CLAUDE_CODE"),
    direct: bool("OPENVIBE_DISABLE_CLAUDE_CODE_SKILLS"),
  }).pipe(Config.map((flags) => flags.broad || flags.direct)),
  enableExa: Config.all({
    experimental,
    enabled: bool("OPENVIBE_ENABLE_EXA"),
    legacy: bool("OPENVIBE_EXPERIMENTAL_EXA"),
  }).pipe(Config.map((flags) => flags.experimental || flags.enabled || flags.legacy)),
  enableParallel: Config.all({
    enabled: bool("OPENVIBE_ENABLE_PARALLEL"),
    legacy: bool("OPENVIBE_EXPERIMENTAL_PARALLEL"),
  }).pipe(Config.map((flags) => flags.enabled || flags.legacy)),
  enableExperimentalModels: bool("OPENVIBE_ENABLE_EXPERIMENTAL_MODELS"),
  enableQuestionTool: bool("OPENVIBE_ENABLE_QUESTION_TOOL"),
  experimentalReferences: enabledByExperimental("OPENVIBE_EXPERIMENTAL_REFERENCES"),
  experimentalBackgroundSubagents: enabledByExperimental("OPENVIBE_EXPERIMENTAL_BACKGROUND_SUBAGENTS"),
  experimentalLspTy: bool("OPENVIBE_EXPERIMENTAL_LSP_TY"),
  experimentalLspTool: enabledByExperimental("OPENVIBE_EXPERIMENTAL_LSP_TOOL"),
  experimentalOxfmt: enabledByExperimental("OPENVIBE_EXPERIMENTAL_OXFMT"),
  experimentalPlanMode: enabledByExperimental("OPENVIBE_EXPERIMENTAL_PLAN_MODE"),
  experimentalCodeMode: enabledByExperimental("OPENVIBE_EXPERIMENTAL_CODE_MODE"),
  experimentalEventSystem: enabledByExperimental("OPENVIBE_EXPERIMENTAL_EVENT_SYSTEM"),
  experimentalWorkspaces: enabledByExperimental("OPENVIBE_EXPERIMENTAL_WORKSPACES"),
  experimentalIconDiscovery: enabledByExperimental("OPENVIBE_EXPERIMENTAL_ICON_DISCOVERY"),
  outputTokenMax: positiveInteger("OPENVIBE_EXPERIMENTAL_OUTPUT_TOKEN_MAX"),
  bashDefaultTimeoutMs: positiveInteger("OPENVIBE_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS"),
  experimentalNativeLlm: bool("OPENVIBE_EXPERIMENTAL_NATIVE_LLM"),
  experimentalWebSockets: bool("OPENVIBE_EXPERIMENTAL_WEBSOCKETS"),
  client: Config.string("OPENVIBE_CLIENT").pipe(Config.withDefault("cli")),
}) {}

export type Info = Context.Service.Shape<typeof Service>

const emptyConfigLayer = Service.layer.pipe(
  Layer.provide(ConfigProvider.layer(ConfigProvider.fromUnknown({}))),
  Layer.orDie,
)

export const layer = (overrides: Partial<Info> = {}) =>
  Layer.effect(
    Service,
    Effect.gen(function* () {
      const flags = yield* Service
      return Service.of({ ...flags, ...overrides })
    }),
  ).pipe(Layer.provide(emptyConfigLayer))

export const node = LayerNode.make({ service: Service, layer: Service.layer.pipe(Layer.orDie), deps: [] })

export * as RuntimeFlags from "./runtime-flags"
import { LayerNode } from "@openvibe-ai/core/effect/layer-node"

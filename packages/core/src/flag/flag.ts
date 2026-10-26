import { Config } from "effect"

export function truthy(key: string) {
  const value = process.env[key]?.toLowerCase()
  return value === "true" || value === "1"
}

const copy = process.env["OPENVIBE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT"]
const fff = process.env["OPENVIBE_DISABLE_FFF"]

function enabledByExperimental(key: string) {
  return process.env[key] === undefined ? truthy("OPENVIBE_EXPERIMENTAL") : truthy(key)
}

export const Flag = {
  OTEL_EXPORTER_OTLP_ENDPOINT: process.env["OTEL_EXPORTER_OTLP_ENDPOINT"],
  OTEL_EXPORTER_OTLP_HEADERS: process.env["OTEL_EXPORTER_OTLP_HEADERS"],

  OPENVIBE_AUTO_HEAP_SNAPSHOT: truthy("OPENVIBE_AUTO_HEAP_SNAPSHOT"),
  OPENVIBE_GIT_BASH_PATH: process.env["OPENVIBE_GIT_BASH_PATH"],
  OPENVIBE_CONFIG: process.env["OPENVIBE_CONFIG"],
  OPENVIBE_CONFIG_CONTENT: process.env["OPENVIBE_CONFIG_CONTENT"],
  OPENVIBE_DISABLE_AUTOUPDATE: truthy("OPENVIBE_DISABLE_AUTOUPDATE"),
  OPENVIBE_ALWAYS_NOTIFY_UPDATE: truthy("OPENVIBE_ALWAYS_NOTIFY_UPDATE"),
  OPENVIBE_DISABLE_PRUNE: truthy("OPENVIBE_DISABLE_PRUNE"),
  OPENVIBE_DISABLE_TERMINAL_TITLE: truthy("OPENVIBE_DISABLE_TERMINAL_TITLE"),
  OPENVIBE_SHOW_TTFD: truthy("OPENVIBE_SHOW_TTFD"),
  OPENVIBE_DISABLE_AUTOCOMPACT: truthy("OPENVIBE_DISABLE_AUTOCOMPACT"),
  OPENVIBE_DISABLE_MODELS_FETCH: truthy("OPENVIBE_DISABLE_MODELS_FETCH"),
  OPENVIBE_DISABLE_MOUSE: truthy("OPENVIBE_DISABLE_MOUSE"),
  OPENVIBE_FAKE_VCS: process.env["OPENVIBE_FAKE_VCS"],
  OPENVIBE_SERVER_PASSWORD: process.env["OPENVIBE_SERVER_PASSWORD"],
  OPENVIBE_SERVER_USERNAME: process.env["OPENVIBE_SERVER_USERNAME"],
  OPENVIBE_DISABLE_FFF: fff === undefined ? process.platform === "win32" : truthy("OPENVIBE_DISABLE_FFF"),

  // Experimental
  OPENVIBE_EXPERIMENTAL_FILEWATCHER: Config.boolean("OPENVIBE_EXPERIMENTAL_FILEWATCHER").pipe(
    Config.withDefault(false),
  ),
  OPENVIBE_EXPERIMENTAL_DISABLE_FILEWATCHER: Config.boolean("OPENVIBE_EXPERIMENTAL_DISABLE_FILEWATCHER").pipe(
    Config.withDefault(false),
  ),
  OPENVIBE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT:
    copy === undefined ? process.platform === "win32" : truthy("OPENVIBE_EXPERIMENTAL_DISABLE_COPY_ON_SELECT"),
  OPENVIBE_MODELS_URL: process.env["OPENVIBE_MODELS_URL"],
  OPENVIBE_MODELS_PATH: process.env["OPENVIBE_MODELS_PATH"],
  OPENVIBE_DB: process.env["OPENVIBE_DB"],

  OPENVIBE_WORKSPACE_ID: process.env["OPENVIBE_WORKSPACE_ID"],
  OPENVIBE_EXPERIMENTAL_WORKSPACES: enabledByExperimental("OPENVIBE_EXPERIMENTAL_WORKSPACES"),

  // Evaluated at access time (not module load) because tests, the CLI, and
  // external tooling set these env vars at runtime.
  get OPENVIBE_DISABLE_PROJECT_CONFIG() {
    return truthy("OPENVIBE_DISABLE_PROJECT_CONFIG")
  },
  get OPENVIBE_EXPERIMENTAL_REFERENCES() {
    return enabledByExperimental("OPENVIBE_EXPERIMENTAL_REFERENCES")
  },
  get OPENVIBE_TUI_CONFIG() {
    return process.env["OPENVIBE_TUI_CONFIG"]
  },
  get OPENVIBE_CONFIG_DIR() {
    return process.env["OPENVIBE_CONFIG_DIR"]
  },
  get OPENVIBE_PURE() {
    return truthy("OPENVIBE_PURE")
  },
  get OPENVIBE_PERMISSION() {
    return process.env["OPENVIBE_PERMISSION"]
  },
  get OPENVIBE_PLUGIN_META_FILE() {
    return process.env["OPENVIBE_PLUGIN_META_FILE"]
  },
  get OPENVIBE_CLIENT() {
    return process.env["OPENVIBE_CLIENT"] ?? "cli"
  },
}

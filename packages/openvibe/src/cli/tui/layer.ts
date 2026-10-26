import { run as runTui, type TuiInput } from "@openvibe-ai/tui"
import { Global } from "@openvibe-ai/core/global"
import { AppNodeBuilder } from "@openvibe-ai/core/effect/app-node-builder"
import { Effect } from "effect"

export function run(input: TuiInput) {
  return runTui(input).pipe(Effect.provide(AppNodeBuilder.build(Global.node)))
}

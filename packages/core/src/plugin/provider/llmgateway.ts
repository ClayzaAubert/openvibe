import { Effect } from "effect"
import { define } from "../internal"

export const LLMGatewayPlugin = define({
  id: "llmgateway",
  effect: Effect.fn(function* (_ctx) {}),
})

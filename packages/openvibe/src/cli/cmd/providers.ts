import { cmd } from "./cmd"
import { effectCmd } from "../effect-cmd"
import { UI } from "../ui"
import * as Prompt from "../effect/prompt"

import { Effect } from "effect"

export const ProvidersCommand = cmd({
  command: "providers",
  describe: "list AI providers",
  builder: (yargs) => yargs.command(ProvidersListCommand).demandCommand(),
  async handler() {},
})

export const ProvidersListCommand = effectCmd({
  command: "list",
  aliases: ["ls"],
  describe: "list providers",
  instance: false,
  handler: Effect.fn("Cli.providers.list")(function* (_args) {
    UI.empty()
    yield* Prompt.intro("Providers")
    yield* Prompt.log.info("No providers are registered")
    yield* Prompt.outro("0 providers")
  }),
})

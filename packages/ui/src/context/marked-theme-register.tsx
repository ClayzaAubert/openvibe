import { registerCustomTheme } from "@pierre/diffs"
import { OpenVibeTheme } from "./marked-theme"

let registered = false

export function registerOpenVibeTheme() {
  if (registered) return
  registered = true
  registerCustomTheme("OpenVibe", () => Promise.resolve(OpenVibeTheme))
}

import { getComponentCatalogue } from "@opentui/solid/components"
import { registerSpinner } from "opentui-spinner/solid"

export function registerOpenvibeSpinner() {
  if (!getComponentCatalogue().spinner) registerSpinner()
}

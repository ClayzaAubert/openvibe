import { $ } from "bun"
import { downloadCliToResources } from "./utils"

await $`bun run install-electron`

await $`bun ./scripts/copy-icons.ts ${process.env.OPENVIBE_CHANNEL ?? "dev"}`

await $`cd ../openvibe && bun script/build-node.ts`
await downloadCliToResources()

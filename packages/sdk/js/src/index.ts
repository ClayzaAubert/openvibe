export * from "./client.js"
export * from "./server.js"

import { createOpenvibeClient } from "./client.js"
import { createOpenvibeServer } from "./server.js"
import type { ServerOptions } from "./server.js"

export async function createOpenvibe(options?: ServerOptions) {
  const server = await createOpenvibeServer({
    ...options,
  })

  const client = createOpenvibeClient({
    baseUrl: server.url,
  })

  return {
    client,
    server,
  }
}

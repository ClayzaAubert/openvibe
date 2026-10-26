import type { Hooks } from "@openvibe-ai/plugin"

export async function AzureAuthPlugin(): Promise<Hooks> {
  return createAzureAuthHooks()
}

export function createAzureAuthHooks(): Hooks {
  const prompts = []
  if (!process.env.AZURE_RESOURCE_NAME) {
    prompts.push({
      type: "text" as const,
      key: "resourceName",
      message: "Enter Azure Resource Name",
      placeholder: "e.g. my-models",
    })
  }
  const hooks: Hooks = {
    auth: {
      provider: "azure",
      methods: [{ type: "api", label: "API key", prompts }],
    },
  }
  return hooks
}

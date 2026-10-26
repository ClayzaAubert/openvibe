import { afterEach, describe, expect, test } from "bun:test"
import { chmod } from "node:fs/promises"
import path from "node:path"
import { pathToFileURL } from "node:url"
import { tmpdir } from "../fixture/fixture"
import { which } from "@openvibe-ai/core/util/which"
import type { Hooks } from "@openvibe-ai/plugin"
import { AzureAuthPlugin, createAzureAuthHooks } from "../../src/plugin/azure"
import { Process } from "../../src/util/process"

const resourceName = process.env.AZURE_RESOURCE_NAME
const originalPath = process.env.PATH

afterEach(() => {
  if (resourceName === undefined) delete process.env.AZURE_RESOURCE_NAME
  else process.env.AZURE_RESOURCE_NAME = resourceName
  if (originalPath === undefined) delete process.env.PATH
  else process.env.PATH = originalPath
})

describe("plugin.azure", () => {
  test("initializes under Node without Bun or a plugin shell", async () => {
    await using tmp = await tmpdir()
    const node = which("node")
    if (!node) throw new Error("Node is required for the Azure runtime compatibility test")
    const bundle = await Bun.build({
      entrypoints: [path.join(import.meta.dir, "../../src/plugin/azure.ts")],
      target: "node",
      format: "esm",
    })
    expect(bundle.success).toBe(true)
    const entry = path.join(tmp.path, "azure.mjs")
    await Bun.write(entry, bundle.outputs[0])
    const result = await Process.run(
      [
        node,
        "--input-type=module",
        "-e",
        `
        import assert from "node:assert/strict"
        import { AzureAuthPlugin } from ${JSON.stringify(pathToFileURL(entry).href)}
        assert.equal(typeof Bun, "undefined")
        delete process.env.AZURE_RESOURCE_NAME
        const hooks = await AzureAuthPlugin({ $: undefined })
        assert.equal(hooks.auth.provider, "azure")
        assert.deepEqual(hooks.auth.methods.map((method) => method.type), ["api"])
      `,
      ],
      {
        env: { PATH: tmp.path, XDG_DATA_HOME: tmp.path },
        nothrow: true,
      },
    )
    expect(result.stderr.toString()).toBe("")
    expect(result.code).toBe(0)
  })

  test("does not invoke Azure CLI during initialization", async () => {
    await using tmp = await tmpdir()
    delete process.env.AZURE_RESOURCE_NAME

    const hooks = await AzureAuthPlugin()

    expect(hooks.auth?.methods[0].prompts?.[0].type).toBe("text")
  })

  test("keeps the existing API-key method", () => {
    delete process.env.AZURE_RESOURCE_NAME
    const hooks = createAzureAuthHooks()

    expect(hooks.auth?.provider).toBe("azure")
    expect(hooks.auth?.methods.map((method) => [method.type, method.label])).toEqual([["api", "API key"]])
    expect(hooks.auth?.methods[0]).toEqual({
      type: "api",
      label: "API key",
      prompts: [
        {
          type: "text",
          key: "resourceName",
          message: "Enter Azure Resource Name",
          placeholder: "e.g. my-models",
        },
      ],
    })
  })
})

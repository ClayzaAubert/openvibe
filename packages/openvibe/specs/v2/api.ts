// @ts-nocheck

import { OpenVibe } from "@openvibe-ai/core"
import { ReadTool } from "@openvibe-ai/core/tools"

const openvibe = OpenVibe.make({})

openvibe.tool.add(ReadTool)

openvibe.tool.add({
  name: "bash",
  schema: {
    type: "object",
    properties: {
      command: {
        type: "string",
        description: "The command to run.",
      },
    },
    required: ["command"],
  },
  execute(input, ctx) {},
})

openvibe.auth.add({
  provider: "openai",
  type: "api",
  value: process.env.OPENAI_API_KEY,
})

openvibe.agent.add({
  name: "build",
  permissions: [],
  model: {
    id: "gpt-5-5",
    provider: "openai",
    variant: "xhigh",
  },
})

const sessionID = await openvibe.session.create({
  agent: "build",
})

openvibe.subscribe((event) => {
  console.log(event)
})

await openvibe.session.prompt({
  sessionID,
  text: "hey what is up",
})

await openvibe.session.prompt({
  sessionID,
  text: "what is up with this",
  files: [
    {
      mime: "image/png",
      uri: "data:image/png;base64,xxxx",
    },
  ],
})

await openvibe.session.wait()

console.log(await openvibe.session.messages(sessionID))

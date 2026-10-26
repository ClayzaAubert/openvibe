import { Context } from "effect"
import type { InstanceContext } from "@/project/instance-context"
import type { WorkspaceV2 } from "@openvibe-ai/core/workspace"

export const InstanceRef = Context.Reference<InstanceContext | undefined>("~openvibe/InstanceRef", {
  defaultValue: () => undefined,
})

export const WorkspaceRef = Context.Reference<WorkspaceV2.ID | undefined>("~openvibe/WorkspaceRef", {
  defaultValue: () => undefined,
})

import type { ElectronAPI } from "../preload/types"

declare global {
  interface Window {
    api: ElectronAPI
    __OPENVIBE__?: {
      deepLinks?: string[]
    }
  }
}

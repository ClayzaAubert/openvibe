interface ImportMetaEnv {
  readonly OPENVIBE_CHANNEL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "virtual:openvibe-server" {
  export namespace Server {
    export const listen: typeof import("../../../openvibe/dist/types/src/node").Server.listen
    export type Listener = import("../../../openvibe/dist/types/src/node").Server.Listener
  }
  export namespace Config {
    export const get: typeof import("../../../openvibe/dist/types/src/node").Config.get
    export type Info = import("../../../openvibe/dist/types/src/node").Config.Info
  }
  export const bootstrap: typeof import("../../../openvibe/dist/types/src/node").bootstrap
}

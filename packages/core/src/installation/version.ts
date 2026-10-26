declare global {
  const OPENVIBE_VERSION: string
  const OPENVIBE_CHANNEL: string
}

export const InstallationVersion = typeof OPENVIBE_VERSION === "string" ? OPENVIBE_VERSION : "local"
export const InstallationChannel = typeof OPENVIBE_CHANNEL === "string" ? OPENVIBE_CHANNEL : "local"
export const InstallationLocal = InstallationChannel === "local"

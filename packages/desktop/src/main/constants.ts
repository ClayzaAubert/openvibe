
type Channel = "dev" | "beta" | "prod"
const raw = import.meta.env.OPENVIBE_CHANNEL
export const CHANNEL: Channel = raw === "dev" || raw === "beta" || raw === "prod" ? raw : "dev"

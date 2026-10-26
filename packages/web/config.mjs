const stage = process.env.SST_STAGE || "dev"

export default {
  url: stage === "production" ? "https://openvibe.ai" : `https://${stage}.openvibe.ai`,
  console: stage === "production" ? "https://openvibe.ai/auth" : `https://${stage}.openvibe.ai/auth`,
  email: "help@anoma.ly",
  socialCard: "https://social-cards.sst.dev",
  github: "https://github.com/ClayzaAubert/openvibe",
  discord: "https://openvibe.ai/discord",
  headerLinks: [
    { name: "app.header.home", url: "/" },
    { name: "app.header.docs", url: "/v2/docs" },
  ],
}

const modelsUrl = process.env.OPENVIBE_MODELS_URL
if (!modelsUrl) throw new Error("OPENVIBE_MODELS_URL is required")

export const modelsData = process.env.MODELS_DEV_API_JSON
  ? await Bun.file(process.env.MODELS_DEV_API_JSON).text()
  : await fetch(`${modelsUrl}/api.json`).then((response) => response.text())

console.log("Loaded models.dev snapshot")

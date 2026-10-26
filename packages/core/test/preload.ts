import path from "path"

process.env.OPENVIBE_DB = ":memory:"
process.env.NPM_CONFIG_AUDIT = "false"
process.env.OPENVIBE_MODELS_PATH = path.join(import.meta.dir, "plugin", "fixtures", "models-dev.json")
process.env.OPENVIBE_DISABLE_MODELS_FETCH = "true"

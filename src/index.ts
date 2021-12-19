import fs from "fs"
import config from "./config"

const outDir = "output"
const fileName = "mc8-config.json"
const path = `${outDir}/${fileName}`

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir)

fs.writeFileSync(path, JSON.stringify(config))

console.log(`Config written to ${path}`)

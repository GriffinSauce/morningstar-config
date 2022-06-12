import fs from "fs"
import config from "./config"

const outDir = "output"
const fileName = "mc8-config.json"
const path = `${outDir}/${fileName}`

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir)

// There's a bug with overwriting? Just delete existing file first
if (fs.existsSync(path)) fs.unlinkSync(path)

fs.writeFileSync(path, JSON.stringify(config))

console.log(`Config written to ${path}`)

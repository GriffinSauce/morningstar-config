import Config from "./types/Config"

const generateSimpleHash = (dataString: string) => {
  let hash = 0

  if (dataString.length === 0) return hash

  for (let i = 0; i < dataString.length; i++) {
    hash = (hash << 5) - hash + dataString.charCodeAt(i)
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}

const generateDataHash = (data: Config["data"]) => {
  const stringified = JSON.stringify(data)
  return generateSimpleHash(stringified)
}

export default generateDataHash

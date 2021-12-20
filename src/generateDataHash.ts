import Config from "./types/Config"

/**
 * Generates a (insecure) hash of a string
 *
 * Needs to match editor implementation, probably from:
 * https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
 */
const generateSimpleHash = (dataString: string) => {
  let hash = 0

  if (dataString.length === 0) return hash

  for (let i = 0; i < dataString.length; i++) {
    hash = (hash << 5) - hash + dataString.charCodeAt(i)
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}

/**
 * Generate a hash of config data
 */
const generateDataHash = (data: Config["data"]) => {
  const stringified = JSON.stringify(data)
  return generateSimpleHash(stringified)
}

export default generateDataHash

import Bank from "./Bank"

interface Config {
  schemaVersion: 1
  dumpType: "allBanks"
  deviceModel: number
  downloadDate: string
  hash: number
  data: {
    bankArray: Bank[]
  }
}

export default Config

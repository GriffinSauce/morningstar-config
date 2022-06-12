import Config from "./types/Config"
import addIndexes from "./utils/addIndexes"
import padMessageLists from "./utils/padMessageLists"
import generateDataHash from "./utils/generateDataHash"
import banksTm from "./banks-tm"
import banksRack from "./banks-rack"

const data: Config["data"] = {
  bankArray: addIndexes(padMessageLists([...banksRack, ...banksTm])),
}

const config: Config = {
  schemaVersion: 1,
  dumpType: "allBanks",
  deviceModel: 4,
  downloadDate: new Date().toISOString(),
  hash: generateDataHash(data),
  data,
}

export default config

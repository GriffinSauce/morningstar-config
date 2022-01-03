import addIndexes from "../utils/addIndexes"
import generateDataHash from "../utils/generateDataHash"
import padMessageLists from "../utils/padMessageLists"
import { togglePreset, clearGlobalPresetToggles } from "../entities/messages"
import Config from "../types/Config"
import preset from "../entities/preset"
import bank, { BankDefinition } from "../entities/bank"
import presets from "./presets"
import { ampChannels, hxStomp, loops } from "./messages"

const baseBank: BankDefinition = {
  name: "CS Base",
  presets: {
    a: presets.clean,
    b: presets.crunch,
    c: presets.rhythm,
    d: presets.heavy,
    e: presets.stompGreenRhino,
    f: presets.stompSD1,
    g: presets.stompMXROD,
    h: presets.lead,
    i: presets.hxSnap1,
    j: presets.hxSnap2,
    k: presets.hxSnap3,
  },
}

const banks = [
  bank(baseBank),
  bank({
    name: "CS: I Lost Track",
    base: baseBank,
    presets: {
      a: preset({
        name: "Intro",
        messages: [
          clearGlobalPresetToggles(),
          loops.off,
          togglePreset(),
          ampChannels.crunch,
          hxStomp.snap2,
        ],
      }),
    },
  }),
  bank({
    name: "CS Anchor",
    base: baseBank,
    presets: {
      f: presets.crunchOct,
      g: presets.rhythmOct,
      h: presets.leadOct,
    },
  }),
  bank({
    name: "CS This is not a drill",
    base: baseBank,
    presets: {
      a: preset({
        name: "Intro",
        messages: [
          clearGlobalPresetToggles(),
          loops.off,
          togglePreset(),
          ampChannels.rhythm,
          hxStomp.snap2,
        ],
      }),
    },
  }),
]

const data: Config["data"] = {
  bankArray: addIndexes(padMessageLists(banks)),
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

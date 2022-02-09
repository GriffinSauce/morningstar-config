import addIndexes from "../utils/addIndexes"
import generateDataHash from "../utils/generateDataHash"
import padMessageLists from "../utils/padMessageLists"

import Config from "../types/Config"

import { togglePreset, clearGlobalPresetToggles } from "../entities/messages"
import preset from "../entities/preset"
import bank, { BankDefinition } from "../entities/bank"

import presets from "./presets"
import { ampChannels, hxStomp, loops } from "./messages"

const baseBank: BankDefinition = {
  name: "CS Base",
  messages: [hxStomp.base],
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
    name: "CS: Yesterday",
    base: baseBank,
  }),
  bank({
    name: "CS: History",
    base: baseBank,
  }),
  bank({
    name: "CS: State of Denial",
    base: baseBank,
  }),
  bank({
    name: "CS: Alluring Sea",
    base: baseBank,
  }),
  bank({
    name: "CS Anchor",
    base: baseBank,
    messages: [hxStomp.anchor],
    presets: {
      f: presets.crunchOct,
      g: presets.rhythmOct,
      h: presets.leadOct,
    },
  }),
  bank({
    name: "CS: Taking a Fall",
    base: baseBank,
  }),
  bank({
    name: "CS: On a Hold",
    base: baseBank,
  }),
  bank({
    name: "CS: Roam",
    base: baseBank,
  }),
  bank({
    name: "CS: I Lost Track",
    base: baseBank,
    messages: [hxStomp.iLostTrack],
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
    name: "CS: Anxiety",
    base: baseBank,
  }),
  bank({
    name: "CS This is not a drill",
    base: baseBank,
    messages: [hxStomp.notADrill],
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

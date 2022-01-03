import addIndexes from "./utils/addIndexes"
import generateDataHash from "./utils/generateDataHash"
import padMessageLists from "./utils/padMessageLists"
import {
  programChange,
  controlChange,
  togglePreset,
  clearGlobalPresetToggles,
  setToggle,
} from "./entities/messages"
import Config from "./types/Config"
import Toggle from "./types/Toggle"
import preset from "./entities/preset"
import bank, { BankDefinition } from "./entities/bank"

const ampChannel = (program: number) =>
  programChange({
    channel: 1,
    program: 0,
  })

const ampChannels = {
  clean: ampChannel(0),
  crunch: ampChannel(1),
  rhythm: ampChannel(2),
  heavy: ampChannel(3),
  lead: ampChannel(4),
}

const hxStomp = {
  snap1: controlChange({
    number: 69,
    value: 0,
    channel: 2,
  }),
  snap2: controlChange({
    number: 69,
    value: 1,
    channel: 2,
  }),
  snap3: controlChange({
    number: 69,
    value: 2,
    channel: 2,
  }),
}

const loops = {
  off: controlChange({
    channel: 6,
    number: 89,
    value: 11,
  }),
}

const presetBaseMessages = [
  clearGlobalPresetToggles(),
  loops.off,
  togglePreset(),
  hxStomp.snap1,
]
const presets = {
  clean: preset({
    name: "Clean",
    messages: [...presetBaseMessages, ampChannels.clean],
  }),
  crunch: preset({
    name: "Crunch",
    messages: [...presetBaseMessages, ampChannels.crunch],
  }),
  rhythm: preset({
    name: "Rhythm",
    messages: [...presetBaseMessages, ampChannels.rhythm],
  }),
  heavy: preset({
    name: "Heavy",
    messages: [...presetBaseMessages, ampChannels.heavy],
  }),
  lead: preset({
    name: "Lead",
    messages: [...presetBaseMessages, ampChannels.lead],
  }),
  crunchOct: preset({
    name: "CrunchOct",
    messages: [
      clearGlobalPresetToggles(),
      loops.off,
      togglePreset(),
      ampChannels.crunch,
      hxStomp.snap2,
    ],
  }),
  rhythmOct: preset({
    name: "RhythmOct",
    messages: [
      clearGlobalPresetToggles(),
      loops.off,
      togglePreset(),
      ampChannels.rhythm,
      hxStomp.snap2,
    ],
  }),
  leadOct: preset({
    name: "LeadOct",
    messages: [
      clearGlobalPresetToggles(),
      loops.off,
      togglePreset(),
      ampChannels.lead,
      hxStomp.snap3,
    ],
  }),
}

const getStompMessages = (controlChangeNumber) => [
  controlChange({
    number: controlChangeNumber,
    value: 127,
    toggle: Toggle.Pos1,
    channel: 6,
  }),
  controlChange({
    number: controlChangeNumber,
    value: 0,
    toggle: Toggle.Pos2,
    channel: 6,
  }),
]

const stompPresets = {
  stompGreenRhino: preset({
    name: "TS",
    toToggle: true,
    messages: getStompMessages(80),
  }),
  stompSD1: preset({
    name: "SD-1",
    toToggle: true,
    messages: getStompMessages(81),
  }),
  stompMXROD: preset({
    name: "MXR OD",
    toToggle: true,
    messages: getStompMessages(82),
  }),
}

const disengageSnapToggles = setToggle({
  data1: 0,
  data2: 64,
  data3: 3,
  data4: 0,
})

const snapPresets = {
  hxSnap1: preset({
    name: "Snap 1",
    messages: [disengageSnapToggles, togglePreset(), hxStomp.snap1],
  }),
  hxSnap2: preset({
    name: "Snap 2",
    messages: [disengageSnapToggles, togglePreset(), hxStomp.snap2],
  }),
  hxSnap3: preset({
    name: "Snap 3",
    messages: [disengageSnapToggles, togglePreset(), hxStomp.snap3],
  }),
}

const baseBank: BankDefinition = {
  name: "CS Base",
  presets: {
    a: presets.clean,
    b: presets.crunch,
    c: presets.rhythm,
    d: presets.heavy,
    e: stompPresets.stompGreenRhino,
    f: stompPresets.stompSD1,
    g: stompPresets.stompMXROD,
    h: presets.lead,
    i: snapPresets.hxSnap1,
    j: snapPresets.hxSnap2,
    k: snapPresets.hxSnap3,
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

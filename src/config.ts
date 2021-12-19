import addIndexes from "./addIndexes"
import {
  programChange,
  controlChange,
  togglePreset,
  clearGlobalPresetToggles,
  setToggle,
} from "./messages"
import padMessageLists from "./padMessageLists"
import preset from "./preset"
import Config from "./types/Config"
import Toggle from "./types/Toggle"

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
}

const stompPresets = {
  stompGreenRhino: preset({
    name: "TS",
    toToggle: true,
    messages: [
      controlChange({
        number: 80,
        value: 127,
        toggle: Toggle.Pos1,
        channel: 6,
      }),
      controlChange({
        number: 80,
        value: 0,
        toggle: Toggle.Pos2,
        channel: 6,
      }),
    ],
  }),
  stompSD1: preset({
    name: "SD-1",
    toToggle: true,
    messages: [
      controlChange({
        number: 81,
        value: 127,
        toggle: Toggle.Pos1,
        channel: 6,
      }),
      controlChange({
        number: 81,
        value: 0,
        toggle: Toggle.Pos2,
        channel: 6,
      }),
    ],
  }),
  stompMXROD: preset({
    name: "Ages",
    toToggle: true,
    messages: [
      controlChange({
        number: 82,
        value: 127,
        toggle: Toggle.Pos1,
        channel: 6,
      }),
      controlChange({
        number: 82,
        value: 0,
        toggle: Toggle.Pos2,
        channel: 6,
      }),
    ],
  }),
}

const snapPresets = {
  hxSnap1: preset({
    name: "Snap 1",
    messages: [
      setToggle({
        data1: 0,
        data2: 64,
        data3: 3,
        data4: 0,
      }),
      togglePreset(),
      hxStomp.snap1,
    ],
  }),
  hxSnap2: preset({
    name: "Snap 2",
    messages: [
      setToggle({
        data1: 0,
        data2: 64,
        data3: 3,
        data4: 0,
      }),
      togglePreset(),
      hxStomp.snap2,
    ],
  }),
  hxSnap3: preset({
    name: "Snap 3",
    messages: [
      setToggle({
        data1: 0,
        data2: 64,
        data3: 3,
        data4: 0,
      }),
      togglePreset(),
      hxStomp.snap3,
    ],
  }),
}

const config: Config = {
  schemaVersion: 1,
  dumpType: "allBanks",
  deviceModel: 4,
  downloadDate: "2021-12-18T08:08:21.730Z",
  hash: -1954114707,
  data: {
    bankArray: addIndexes(
      padMessageLists([
        {
          bankName: "CS Base",
          bankClearToggle: false,
          bankMsgArray: [],
          presetArray: [
            presets.clean,
            presets.crunch,
            presets.rhythm,
            presets.heavy,
            stompPresets.stompGreenRhino,
            stompPresets.stompSD1,
            stompPresets.stompMXROD,
            presets.lead,
            snapPresets.hxSnap1,
            snapPresets.hxSnap2,
            snapPresets.hxSnap3,
          ],
          expPresetArray: [],
        },
        {
          bankName: "CS: I Lost Track",
          bankClearToggle: false,
          bankMsgArray: [],
          presetArray: [
            preset({
              name: "Intro",
              messages: [
                clearGlobalPresetToggles(),
                loops.off,
                togglePreset(),
                ampChannels.crunch,
                hxStomp.snap2,
              ],
            }),
            presets.crunch,
            presets.rhythm,
            presets.heavy,
            stompPresets.stompGreenRhino,
            stompPresets.stompSD1,
            stompPresets.stompMXROD,
            presets.lead,
            snapPresets.hxSnap1,
            snapPresets.hxSnap2,
            snapPresets.hxSnap3,
          ],
          expPresetArray: [],
        },
        {
          bankName: "CS Anchor",
          bankClearToggle: false,
          bankMsgArray: [],
          presetArray: [
            presets.clean,
            presets.crunch,
            presets.rhythm,
            presets.heavy,
            stompPresets.stompGreenRhino,
            preset({
              name: "CrunchOct",
              messages: [
                clearGlobalPresetToggles(),
                loops.off,
                togglePreset(),
                ampChannels.crunch,
                hxStomp.snap2,
              ],
            }),
            preset({
              name: "RhythmOct",
              messages: [
                clearGlobalPresetToggles(),
                loops.off,
                togglePreset(),
                ampChannels.rhythm,
                hxStomp.snap2,
              ],
            }),
            preset({
              name: "LeadOct",
              messages: [
                clearGlobalPresetToggles(),
                loops.off,
                togglePreset(),
                ampChannels.lead,
                hxStomp.snap3,
              ],
            }),
            snapPresets.hxSnap1,
            snapPresets.hxSnap2,
            snapPresets.hxSnap3,
          ],
          expPresetArray: [],
        },
        {
          bankName: "CS This is not a drill",
          bankClearToggle: false,
          bankMsgArray: [],
          presetArray: [
            preset({
              name: "Intro",
              messages: [
                clearGlobalPresetToggles(),
                loops.off,
                togglePreset(),
                ampChannels.rhythm,
                hxStomp.snap2,
              ],
            }),
            presets.crunch,
            presets.rhythm,
            presets.heavy,
            stompPresets.stompGreenRhino,
            stompPresets.stompSD1,
            stompPresets.stompMXROD,
            presets.lead,
            snapPresets.hxSnap1,
            snapPresets.hxSnap2,
            snapPresets.hxSnap3,
          ],
          expPresetArray: [],
        },
      ]),
    ),
  },
}

export default config

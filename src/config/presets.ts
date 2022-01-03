import Toggle from "../types/Toggle"
import {
  controlChange,
  togglePreset,
  clearGlobalPresetToggles,
  setToggle,
} from "../entities/messages"
import preset from "../entities/preset"
import { ampChannels, hxStomp, loops } from "./messages"

const toneBaseMessages = [
  clearGlobalPresetToggles(),
  loops.off,
  togglePreset(),
  hxStomp.snap1,
]

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

const disengageSnapToggles = setToggle({
  data1: 0,
  data2: 64,
  data3: 3,
  data4: 0,
})

const presets = {
  clean: preset({
    name: "Clean",
    messages: [...toneBaseMessages, ampChannels.clean],
  }),
  crunch: preset({
    name: "Crunch",
    messages: [...toneBaseMessages, ampChannels.crunch],
  }),
  rhythm: preset({
    name: "Rhythm",
    messages: [...toneBaseMessages, ampChannels.rhythm],
  }),
  heavy: preset({
    name: "Heavy",
    messages: [...toneBaseMessages, ampChannels.heavy],
  }),
  lead: preset({
    name: "Lead",
    messages: [...toneBaseMessages, ampChannels.lead],
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

export default presets

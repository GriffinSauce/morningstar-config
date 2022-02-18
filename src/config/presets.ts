import Toggle from "../types/Toggle"

import {
  controlChange,
  togglePreset,
  clearGlobalPresetToggles,
  setToggle,
} from "../entities/messages"
import preset from "../entities/preset"

import { ampChannels, getLoopProgram, hxStomp, loops } from "./messages"
import { TogglePosition } from "../entities/getSetToggleData"

const toneBaseMessages = [
  clearGlobalPresetToggles(),
  loops.off,
  togglePreset(),
  hxStomp.snap1,
]

const disengageSnapToggles = setToggle({
  togglePosition: TogglePosition.DisEngageToggle,
  applyToPresets: {
    m: true,
    n: true,
    o: true,
  },
})

const engageEQMessages = [
  setToggle({
    togglePosition: TogglePosition.EngageToggle,
    applyToPresets: {
      e: true,
    },
  }),
  controlChange({
    channel: 6,
    number: 89,
    value: getLoopProgram({ three: true }),
  }),
]

const engageSD1Messages = [
  setToggle({
    togglePosition: TogglePosition.EngageToggle,
    applyToPresets: {
      f: true,
    },
  }),
  controlChange({
    channel: 6,
    number: 89,
    value: getLoopProgram({ two: true }),
  }),
]

const presets = {
  clean: preset({
    name: "Clean",
    messages: [...toneBaseMessages, ampChannels.clean1],
  }),
  crunch: preset({
    name: "Crunch",
    messages: [...toneBaseMessages, ampChannels.crunch, ...engageEQMessages],
  }),
  rhythm: preset({
    name: "Rhythm",
    messages: [...toneBaseMessages, ampChannels.rhythm, ...engageEQMessages],
  }),
  heavy: preset({
    name: "Heavy",
    messages: [...toneBaseMessages, ampChannels.heavy1],
  }),
  lead: preset({
    name: "Lead",
    messages: [...toneBaseMessages, ampChannels.lead1, ...engageSD1Messages],
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
      ampChannels.lead1,
      hxStomp.snap3,
    ],
  }),

  stompGreenRhino: preset({
    name: "TS",
    toToggle: true,
    messages: [
      setToggle({
        togglePosition: TogglePosition.DisEngageToggle,
        applyToPresets: {
          e: true,
          f: true,
        },
      }),
      controlChange({
        toggle: Toggle.Pos1,
        channel: 6,
        number: 89,
        value: getLoopProgram({ one: true }),
      }),
      controlChange({
        toggle: Toggle.Pos2,
        channel: 6,
        number: 89,
        value: getLoopProgram({ one: false }),
      }),
    ],
  }),
  stompSD1: preset({
    name: "SD-1",
    toToggle: true,
    messages: [
      setToggle({
        togglePosition: TogglePosition.DisEngageToggle,
        applyToPresets: {
          e: true,
          g: true,
        },
      }),
      controlChange({
        toggle: Toggle.Pos1,
        channel: 6,
        number: 89,
        value: getLoopProgram({ two: true }),
      }),
      controlChange({
        toggle: Toggle.Pos2,
        channel: 6,
        number: 89,
        value: getLoopProgram({ two: false }),
      }),
    ],
  }),
  stompEQ: preset({
    name: "EQ",
    toToggle: true,
    messages: [
      setToggle({
        togglePosition: TogglePosition.DisEngageToggle,
        applyToPresets: {
          f: true,
          g: true,
        },
      }),
      controlChange({
        toggle: Toggle.Pos1,
        channel: 6,
        number: 89,
        value: getLoopProgram({ three: true }),
      }),
      controlChange({
        toggle: Toggle.Pos2,
        channel: 6,
        number: 89,
        value: getLoopProgram({ three: false }),
      }),
    ],
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

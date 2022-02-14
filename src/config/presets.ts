import Toggle from "../types/Toggle"

import {
  controlChange,
  togglePreset,
  clearGlobalPresetToggles,
  setToggle,
} from "../entities/messages"
import preset from "../entities/preset"

import { ampChannels, hxStomp, loops } from "./messages"
import { TogglePosition } from "../entities/getSetToggleData"

const toneBaseMessages = [
  clearGlobalPresetToggles(),
  loops.off,
  togglePreset(),
  hxStomp.snap1,
]

/**
 * Join loop settings to generate program number based on these masks;
 *
 * #   LP1 LP2
 * 1X  OFF OFF
 * 2X  ON  OFF
 * 3X  OFF ON
 * 4X  ON  ON
 *
 *  #  LP3 LP4
 * X1  OFF OFF
 * X2  ON  OFF
 * X3  OFF ON
 * X4  ON  ON
 */
const getLoopProgram = ({
  one = false,
  two = false,
  three = false,
  four = false,
}): number => {
  let programX = 10
  let programY = 1
  if (one) programX = 20
  if (two) programX = 30
  if (one && two) programX = 40
  if (three) programY = 2
  if (four) programY = 3
  if (three && four) programY = 4
  return programX + programY
}

const disengageSnapToggles = setToggle({
  togglePosition: TogglePosition.DisEngageToggle,
  applyToPresets: {
    m: true,
    n: true,
    o: true,
  },
})

const presets = {
  clean: preset({
    name: "Clean",
    messages: [...toneBaseMessages, ampChannels.clean1],
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
    messages: [...toneBaseMessages, ampChannels.heavy1],
  }),
  lead: preset({
    name: "Lead",
    messages: [...toneBaseMessages, ampChannels.lead1],
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

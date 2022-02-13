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
    messages: [
      setToggle({
        // F & G off
        data1: 64,
        data2: 1,
        data3: 0,
        data4: 0,
      }),
      controlChange({
        channel: 6,
        number: 89,
        value: getLoopProgram({ one: true }),
      }),
    ],
  }),
  stompSD1: preset({
    name: "SD-1",
    toToggle: true,
    messages: [
      setToggle({
        // E & G off
        data1: 32,
        data2: 1,
        data3: 0,
        data4: 0,
      }),
      controlChange({
        channel: 6,
        number: 89,
        value: getLoopProgram({ two: true }),
      }),
    ],
  }),
  stompMXROD: preset({
    name: "EQ",
    toToggle: true,
    messages: [
      setToggle({
        // E & F off
        data1: 96,
        data2: 0,
        data3: 0,
        data4: 0,
      }),
      controlChange({
        channel: 6,
        number: 89,
        value: getLoopProgram({ three: true }),
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

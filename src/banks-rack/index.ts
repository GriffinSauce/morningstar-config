import { togglePreset, clearGlobalPresetToggles } from "../entities/messages"
import preset from "../entities/preset"
import bank, { BankDefinition } from "../entities/bank"

import presets from "./presets"
import { ampChannels, hxStomp, loops } from "./messages"
import Bank from "../types/Bank"

const baseBankProps: BankDefinition = {
  messages: [hxStomp.base],
  presets: {
    a: presets.clean,
    b: presets.crunch,
    c: presets.rhythm,
    d: presets.heavy,
    e: presets.stompSugarDrive,
    f: presets.stompSD1,
    g: presets.stompHorseman,
    h: presets.lead,
    i: presets.hxSnap1,
    j: presets.hxSnap2,
    k: presets.hxSnap3,
  },
}

const baseBank = bank(baseBankProps)

const bankDefinitions: Record<string, ReturnType<typeof bank>> = {
  ["CS: Base"]: baseBank,
  ["CS: Yesterday"]: baseBank,
  ["CS: History"]: baseBank,
  ["CS: State of Denial"]: baseBank,
  ["CS: Alluring Sea"]: baseBank,
  ["CS: Anchor"]: bank({
    base: baseBankProps,
    messages: [hxStomp.anchor],
    presets: {
      f: presets.crunchOct,
      g: presets.rhythmOct,
      h: presets.leadOct,
    },
  }),
  ["CS: Monkeys"]: baseBank,
  ["CS: Taking a Fall"]: baseBank,
  ["CS: On a Hold"]: baseBank,
  ["CS: Roam"]: baseBank,
  ["CS: I Lost Track"]: bank({
    base: baseBankProps,
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
  ["CS: Anxiety"]: baseBank,
  ["CS: This is not a drill"]: bank({
    base: baseBankProps,
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
}

const setList = [
  "CS: Yesterday",
  "CS: History",
  "CS: State of Denial",
  "CS: Alluring Sea",
  "CS: Anchor",
  "CS: Monkeys",
  "CS: Taking a Fall",
  "CS: On a Hold",
  "CS: I Lost Track",
  "CS: Anxiety",
  "CS: Roam",
  "CS: This is not a drill",
]

const banks = setList.map((songName): Bank => {
  const bank = bankDefinitions[songName]

  if (!bank) throw new Error(`No bank for ${songName}`)

  return {
    ...bank,
    bankName: songName,
  }
})

export default banks

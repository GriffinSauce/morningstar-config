import merge from "lodash/merge"

import Bank from "../types/Bank"
import Message from "../types/Message"
import Preset from "../types/Preset"

const presetKeys = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
] as const

const expressionPresetKeys = ["expr1", "expr2", "expr3", "expr4"] as const

type PresetKey = typeof presetKeys[number]

type ExpressionPresetKey = typeof expressionPresetKeys[number]

type Presets = Record<PresetKey, Preset>

type ExpressionPresets = Record<ExpressionPresetKey, Preset>

interface BankDefinitionBase {
  name: string
  clearToggle?: boolean
  messages?: Message[]
  presets?: Partial<Presets>
  expressionPresets?: Partial<ExpressionPresets>
}

export interface BankDefinition extends BankDefinitionBase {
  base?: BankDefinitionBase
}

const bank = (input: BankDefinition): Bank => {
  const { base } = input

  const merged = merge({}, base, input, {
    presets: merge({}, base?.presets, input.presets),
    expressionPresets: merge(
      {},
      base?.expressionPresets,
      input.expressionPresets,
    ),
  })

  const {
    name,
    clearToggle = false,
    messages = [],
    presets = {},
    expressionPresets = {},
  } = merged

  return {
    bankName: name,
    bankClearToggle: clearToggle,
    bankMsgArray: messages,
    presetArray: Object.values(presets),
    expPresetArray: Object.values(expressionPresets),
  }
}

export default bank

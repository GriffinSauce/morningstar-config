import merge from "lodash/merge"

import Bank from "../types/Bank"
import Message from "../types/Message"
import Preset from "../types/Preset"
import PresetKey from "../types/PresetKey"

const expressionPresetKeys = ["expr1", "expr2", "expr3", "expr4"] as const

type ExpressionPresetKey = typeof expressionPresetKeys[number]

type Presets = Record<PresetKey, Preset>

type ExpressionPresets = Record<ExpressionPresetKey, Preset>

interface BankDefinitionBase {
  clearToggle?: boolean
  messages?: Message[]
  presets?: Partial<Presets>
  expressionPresets?: Partial<ExpressionPresets>
}

export interface BankDefinition extends BankDefinitionBase {
  base?: BankDefinitionBase
}

const bank = (input: BankDefinition): Omit<Bank, "bankName"> => {
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
    clearToggle = false,
    messages = [],
    presets = {},
    expressionPresets = {},
  } = merged

  return {
    bankClearToggle: clearToggle,
    bankMsgArray: messages,
    presetArray: Object.values(presets),
    expPresetArray: Object.values(expressionPresets),
  }
}

export default bank

import Bank from "../types/Bank"

/**
 * The configuration output should have indexes for each bank, preset and message.
 * We can add them with a simple loop and let the rest of the code forget about them.
 */
const addIndexes = (banks: Bank[]): Bank[] =>
  banks.map((bank, bankNumber) => {
    return {
      ...bank,
      bankNumber,
      bankMsgArray: bank.bankMsgArray.map((message, msgNum) => {
        return {
          ...message,
          msgNum,
        }
      }),
      presetArray: bank.presetArray.map((preset, presetNum) => {
        return {
          ...preset,
          presetNum,
          bankNum: bankNumber,
          msgArray: preset.msgArray.map((message, msgNum) => {
            return {
              ...message,
              msgNum,
            }
          }),
        }
      }),
      expPresetArray: bank.expPresetArray.map((preset, presetNum) => {
        return {
          ...preset,
          presetNum,
          bankNum: bankNumber,
          msgArray: preset.msgArray.map((message, msgNum) => {
            return {
              ...message,
              msgNum,
            }
          }),
        }
      }),
    }
  })

export default addIndexes

import Bank from "./types/Bank"

const addIndexes = (banks: Bank[]): Bank[] =>
  banks.map((bank, bankNumber) => {
    return {
      ...bank,
      bankNumber,
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
    }
  })

export default addIndexes

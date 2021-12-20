import { empty } from "../messages"
import Bank from "../types/Bank"
import Message from "../types/Message"

const padMessageList = (messages: Message[]) => {
  const messageListSize = 16
  const padNum = messageListSize - messages.length
  const padMessages = Array(padNum).fill(empty())
  return messages.concat(padMessages)
}

/**
 * The message lists are expected to be completely filled
 * The editor logic loops over the internal representation and overwrites with the imported data
 */
const padMessageLists = (banks: Bank[]): Bank[] =>
  banks.map((bank) => {
    return {
      ...bank,
      bankMsgArray: padMessageList(bank.bankMsgArray),
      presetArray: bank.presetArray.map((preset) => {
        return {
          ...preset,
          msgArray: padMessageList(preset.msgArray),
        }
      }),
    }
  })

export default padMessageLists

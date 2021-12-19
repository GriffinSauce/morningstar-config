import Message from "./Message"
import Preset from "./Preset"

interface Bank {
  bankName: string
  bankClearToggle: boolean
  bankMsgArray: Message[]
  presetArray: Preset[]
  expPresetArray: Preset[]
}

export default Bank

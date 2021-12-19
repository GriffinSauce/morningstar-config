import Message from "./Message"

interface Preset {
  isExp?: boolean
  name?: string
  shortName?: string
  toggleName?: string
  longName?: string
  toToggle?: boolean
  toBlink?: boolean
  toMsgScroll?: boolean
  toggleGroup?: number
  msgArray?: Message[]
}

export default Preset

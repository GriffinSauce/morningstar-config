import Preset from "./types/Preset"

interface Input
  extends Pick<
    Preset,
    | "isExp"
    | "shortName"
    | "toggleName"
    | "longName"
    | "toToggle"
    | "toBlink"
    | "toMsgScroll"
    | "toggleGroup"
  > {
  name: string
  messages: Preset["msgArray"]
}

const preset = ({
  isExp = false,
  name = "EMPTY",
  shortName = "EMPTY",
  toggleName = ">>EMPTY<<",
  longName = "EMPTY",
  toToggle = false,
  toBlink = true,
  toMsgScroll = false,
  toggleGroup = 0,
  messages = [],
}: Input): Preset => {
  return {
    isExp,
    shortName: name ? name : shortName,
    toggleName: name ? `>>${name}<<` : toggleName,
    longName: name ? name : longName,
    toToggle,
    toBlink,
    toMsgScroll,
    toggleGroup,
    msgArray: messages,
  }
}

export default preset

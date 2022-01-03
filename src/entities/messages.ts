import Toggle from "../types/Toggle"
import Action from "../types/Action"
import Type from "../types/Type"
import Message from "../types/Message"

export const empty = (): Message => {
  return {
    data1: 0,
    data2: 0,
    data3: 0,
    data4: 0,
    channel: 1,
    type: Type.Empty,
    action: Action.NoAction,
    toggle: Toggle.Pos1,
    msgInfo: "",
  }
}

export const programChange = ({
  action = Action.Press,
  toggle = Toggle.Both,
  channel = 1,
  program = 0,
}: {
  action?: Action
  toggle?: Toggle
  channel: number
  program: number
}): Message => {
  return {
    data1: program,
    data2: 0,
    data3: 0,
    data4: 0,
    channel,
    type: Type.ProgramChange,
    action,
    toggle,
    msgInfo: "",
  }
}

export const controlChange = ({
  action = Action.Press,
  toggle = Toggle.Both,
  channel = 1,
  number = 0,
  value = 0,
}: {
  action?: Action
  toggle?: Toggle
  channel: number
  number: number
  value: number
}): Message => {
  return {
    data1: number,
    data2: value,
    data3: 0,
    data4: 0,
    channel,
    type: Type.ControlChange,
    action,
    toggle,
    msgInfo: "",
  }
}

export const togglePreset = ({
  action = Action.Press,
  toggle = Toggle.Both,
}: {
  action?: Action
  toggle?: Toggle
} = {}): Message => {
  return {
    data1: 0,
    data2: 0,
    data3: 0,
    data4: 0,
    channel: 1,
    type: Type.TogglePreset,
    action,
    toggle,
    msgInfo: "",
  }
}

/**
 * Data format not fully understood yet...
 */
export const setToggle = ({
  action = Action.Press,
  toggle = Toggle.Both,
  data1,
  data2,
  data3,
  data4,
}: {
  action?: Action
  toggle?: Toggle
  data1: number
  data2: number
  data3: number
  data4: number
}): Message => {
  return {
    data1,
    data2,
    data3,
    data4,
    channel: 1,
    type: Type.SetToggle,
    action,
    toggle,
    msgInfo: "",
  }
}

export const clearGlobalPresetToggles = ({
  action = Action.Press,
  toggle = Toggle.Both,
}: {
  action?: Action
  toggle?: Toggle
} = {}): Message => {
  return {
    data1: 126,
    data2: 3,
    data3: 0,
    data4: 0,
    channel: 1,
    type: Type.SetToggle,
    action,
    toggle,
    msgInfo: "",
  }
}

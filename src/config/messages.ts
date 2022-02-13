import { controlChange, programChange } from "../entities/messages"

const ampChannel = (program: number) =>
  programChange({
    channel: 1,
    program,
  })

export const ampChannels = {
  clean1: ampChannel(0),
  /**
   * @deprecated - single channel module
   */
  clean2: ampChannel(1),
  crunch: ampChannel(2),
  rhythm: ampChannel(3),
  heavy1: ampChannel(4),
  heavy2: ampChannel(5),
  lead1: ampChannel(6),
  /**
   * @deprecated - single channel module
   */
  lead2: ampChannel(7),
}

export const hxStomp = {
  base: programChange({
    program: 0,
    channel: 2,
  }),
  iLostTrack: programChange({
    program: 1,
    channel: 2,
  }),
  anchor: programChange({
    program: 2,
    channel: 2,
  }),
  notADrill: programChange({
    program: 3,
    channel: 2,
  }),
  snap1: controlChange({
    number: 69,
    value: 0,
    channel: 2,
  }),
  snap2: controlChange({
    number: 69,
    value: 1,
    channel: 2,
  }),
  snap3: controlChange({
    number: 69,
    value: 2,
    channel: 2,
  }),
}

export const loops = {
  off: controlChange({
    channel: 6,
    number: 89,
    value: 11,
  }),
}

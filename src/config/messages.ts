import { controlChange, programChange } from "../entities/messages"

const ampChannel = (program: number) =>
  programChange({
    channel: 1,
    program: 0,
  })

export const ampChannels = {
  clean: ampChannel(0),
  crunch: ampChannel(1),
  rhythm: ampChannel(2),
  heavy: ampChannel(3),
  lead: ampChannel(4),
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

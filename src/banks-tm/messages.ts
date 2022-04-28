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
  clean2: ampChannel(0),
  crunch: ampChannel(2),
  rhythm: ampChannel(2),
  heavy1: ampChannel(4),
  heavy2: ampChannel(4),
  lead1: ampChannel(6),
  /**
   * @deprecated - single channel module
   */
  lead2: ampChannel(6),
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

/**
 * Join loop settings to generate program number based on these masks;
 *
 * #   LP1 LP2
 * 1X  OFF OFF
 * 2X  ON  OFF
 * 3X  OFF ON
 * 4X  ON  ON
 *
 *  #  LP3 LP4
 * X1  OFF OFF
 * X2  ON  OFF
 * X3  OFF ON
 * X4  ON  ON
 */
export const getLoopProgram = ({
  one = false,
  two = false,
  three = false,
  four = false,
}: {
  one?: boolean
  two?: boolean
  three?: boolean
  four?: boolean
}): number => {
  let programX = 10
  let programY = 1
  if (one) programX = 20
  if (two) programX = 30
  if (one && two) programX = 40
  if (three) programY = 2
  if (four) programY = 3
  if (three && four) programY = 4
  return programX + programY
}

export const loops = {
  off: controlChange({
    channel: 6,
    number: 89,
    value: getLoopProgram({}),
  }),
}

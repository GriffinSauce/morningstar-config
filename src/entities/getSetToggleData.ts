import PresetKey from "../types/PresetKey"

export enum TogglePosition {
  DisEngageToggle = 0,
  EngageToggle = 1,
  Toggle = 2,
  Shift = 3,
  ShiftPlus = 5,
  Unshift = 4,
}

export type ApplyToPresets = Record<PresetKey, boolean>

interface Input {
  applyToPresets: Partial<ApplyToPresets>
  togglePosition: TogglePosition
}

// 22 booleans
type ToggleList = boolean[]

interface GetDataInput {
  toggleList: ToggleList
  togglePosition: TogglePosition
}

// { a: false, b: false, /* .. */ v:false }
const basePresetToggles = Array(22)
  .fill("")
  .map((_, i) => String.fromCharCode(i + 65).toLowerCase())
  .reduce(
    (positions, key) => ({
      ...positions,
      [key]: false,
    }),
    {},
  ) as ApplyToPresets

const getData1 = ({ toggleList, togglePosition }: GetDataInput): number => {
  return (
    (+toggleList
      .slice(0, 6)
      .reverse()
      .map((e) => Number(e))
      .reduce(function (e, n) {
        return (+e << 1) | +n
      }) <<
      1) |
    (1 & togglePosition)
  )
}

const getData2 = ({ toggleList }: GetDataInput): number => {
  return +toggleList
    .slice(6, 13)
    .reverse()
    .map((e) => Number(e))
    .reduce((e, n) => (+e << 1) | +n)
}

const getData3 = ({ toggleList, togglePosition }: GetDataInput): number => {
  return (
    (+toggleList[18] << 6) |
    (+toggleList[17] << 5) |
    (+toggleList[16] << 4) |
    (((2 & togglePosition) >> 1) << 3) |
    (+toggleList[15] << 2) |
    (+toggleList[14] << 1) |
    (+toggleList[13] << 0)
  )
}

export const getSetToggleData = ({ togglePosition, applyToPresets }: Input) => {
  // Merge partial like { c: true } with everything-off base
  const mergedPresetToggles = {
    ...basePresetToggles,
    ...applyToPresets,
  }

  // Convert to array of 22 booleans
  const toggleList: ToggleList = Object.values(mergedPresetToggles)

  return {
    data1: getData1({
      toggleList,
      togglePosition,
    }),
    data2: getData2({
      toggleList,
      togglePosition,
    }),
    data3: getData3({
      toggleList,
      togglePosition,
    }),
    data4: 0,
  }
}

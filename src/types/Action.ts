enum Action {
  NoAction = 0,
  Press = 1,
  Release = 2,
  LongPress = 3,
  LongPressRelease = 4,
  DoubleTap = 5,
  DoubleTapRelease = 6,
  LongDoubleTap = 7,
  LongDoubleTapRelease = 8,
  ReleaseAll = 9,
  LongPressScroll = 10,
  OnDisengage = 11,
  OnFirstEngage = 12,
  OnFirstEngageSendOnlyThis = 13,
}

export default Action

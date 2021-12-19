enum Type {
  // Standard
  Empty = 0,
  ProgramChange = 1,
  ProgramChangeMultiChannel = 34,
  ControlChange = 2,
  NoteOn = 3,
  NoteOff = 4,
  RealTime = 5,
  SongPosition = 25,
  SongSelect = 29,
  SysEx = 6,

  // Misc
  MidiClock = 7,
  MidiClockTap = 24,
  ProgramChangeScrollUpDeprecated = 8,
  ProgramChangeScrollDownDeprecated = 9,
  ProgramChangeNumberScroll = 33,
  CCValueScroll = 32,
  CCWaveformGenerator = 26,
  CCSequenceGenerator = 31,

  //Device
  EngagePreset = 27,
  BankUp = 10,
  BankDown = 11,
  BankChangeMode = 12,
  BankJump = 13,
  TogglePage = 14,
  TogglePreset = 22,
  SetToggle = 15,
  SetMIDIThru = 16,
  SelectExpMessage = 17,
  LooperMode = 18,
  Delay = 23,
  Utility = 36,

  //OtherDevices
  StrymonBankUp = 19,
  StrymonBankDown = 20,
  FractalAudioTuner = 21,
  FractalAudioIntegration = 37,
  KemperTuner = 28,
  MorningstarML5X = 39,
  MorningstarRelayInterface = 40,

  // Other
  Keystroke = 35,
}

export default Type

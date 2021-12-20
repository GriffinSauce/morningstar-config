# Morningstar Config

This codebase generates a configuration from TypeScript for the [Morningstar MC8](https://www.morningstarfx.com/mc8-midi-controller) MIDI controller that can be imported via the [Morningstar editor](https://editor-mkii.morningstar.io/mcgen2).

## Why?

Using code instead of a manual editor allows for abstractions across the config (eg. reuse preset definitions in multiple banks, inherit presets from another bank while overwriting just one, etc.). A complex configuration can be expressed in very little code while documentation can be added where needed.

The editing experience can also be more pleasant if you are comfortable writing code.

A major downside is discoverability of controller features and concepts. It's advisable to get to grips with the hardware and editor before starting to build a generated config.

## Install

```
yarn install
```

## Build the config file

```
yarn build
```

The generated config JSON file will be located in the [output](./output) directory.

## Develop

Watch source files and generate a new config whenever a file changes. Use this to quickly iterate on your config.

```
yarn dev
```

## Creating your own config

To reuse this repo to generate your own MC8 config you should:
- MAKE A BACKUP of your existing setup
- Check the [caveats](#caveats)
- Fork the repo
- Change [./src/config.ts](./src/config.ts) to your needs
- Run the [build](#build-the-config-file) (or [dev](#develop)) to generate the JSON

## Caveats


- Not all MC8 features are implemented, only the ones I have needed so far - please contribute or create an issue if you need something that is missing :)
- Morningstar iterates quickly, no guarantees for compatibility or stability
- While I suspect the config format is portable to other Morningstar devices only the MC8 is tested
- Absolutely zero guarantees, do not load a config and step onto the stage without thoroughly testing your rig!

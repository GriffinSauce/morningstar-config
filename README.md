# Morningstar Config

This codebase generates a configuration from TypeScript for the [Morningstar MC8](https://www.morningstarfx.com/mc8-midi-controller) MIDI controller that can be imported via the [Morningstar editor](https://editor-mkii.morningstar.io/mcgen2).

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
- Check the [caveats](#caveats)
- Fork the repo
- Change [./src/config.ts](./src/config.ts) to your needs
- Run the [build](#build-the-config-file) (or [dev](#develop)) to generate the JSON

## Caveats


- Not all MC8 features are implemented, only the ones I have needed so far - please contribute or create an issue if you need something that is missing :)
- Morningstar iterates quickly, no guarantees for compatibility
- While I suspect the config format is portable to other Morningstar devices only the MC8 is tested
- Absolutely zero guarantees, do not load a config and step onto the stage without thoroughly testing your rig!

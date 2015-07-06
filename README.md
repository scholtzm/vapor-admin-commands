# Vapor Admin Commands Plugin

[Vapor](https://github.com/scholtzm/vapor) plugin which adds several useful admin commands.

### Features

- Adds commands to quickly change bot's name or online state
- All changes done using commands are only temporary (until you restart your bot)

### Installation

1. Go to your Vapor folder.
2. Run `npm install git+https://github.com/scholtzm/vapor-admin-commands.git`.
3. Open your config file and update `plugins` to include this plugin. It should look something like this...

```json
"plugins": {
  "vapor-admin-commands": {}
}
```

### Commands

Command | Description | Example
------- | ----------- | -------
!set name {displayName} | Changes bot's display name. Limit for the name is 32 characters. | !set name Banana Bot
!set state {stateName} | Changes bot's online state. | !set state trade

The list of commands is currently fairly short. More will be added if necessary.

Feel free to open an issue if you have an idea for a command.

### License

MIT. See `LICENSE`.

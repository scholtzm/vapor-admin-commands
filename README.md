[![NPM version](http://img.shields.io/npm/v/vapor-admin-commands.svg?style=flat)](https://www.npmjs.org/package/vapor-admin-commands)

# Vapor Admin Commands Plugin

[Vapor](https://github.com/scholtzm/vapor) plugin which adds several useful admin commands.

### Features

- Adds bunch of useful admin commands
- All changes are optionally persisted back to config file in JSON format

### Installation

```sh
npm install vapor-admin-commands
```

### Usage

```js
var adminCommands = require('vapor-admin-commands');

// Instantiate Vapor etc.

vapor.use(adminCommands);
// or
vapor.use(adminCommands, {config: {configPath: './myConfig.json'}});
```

### Configuration

#### `configPath` (optional)

Path to your configuration file.

### Commands

Command | Description | Example
------- | ----------- | -------
!set name {displayName} | Changes bot's display name. Limit for the name is 32 characters. | !set name Banana Bot
!set state {stateName} | Changes bot's online state. | !set state trade
!disconnect | Disconnects from Steam network. | *
!help | Lists all available admin commands | *

The list of commands is currently fairly short. More will be added if necessary.

Feel free to open an issue if you have an idea for a command.

### License

MIT. See `LICENSE`.

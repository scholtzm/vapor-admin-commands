var fs = require('fs');

module.exports = {

    /**
     * Command: !set name <displayName>
     */
    setName: {
        description: '!set name {displayName} | Changes bot\'s display name. Limit for the name is 32 characters.',
        // Maximum name length is 32 characters
        regex: /^!set name (.{1,32})/,
        action: function(VaporAPI, user, match) {
            var log = VaporAPI.getLogger();
            var steamFriends = VaporAPI.getHandler('steamFriends');
            var config = VaporAPI.getConfig();
            var pluginConfig = VaporAPI.data || {};

            steamFriends.setPersonaName(match[1]);
            config.displayName = match[1];

            if(pluginConfig.configPath) {
                fs.writeFileSync(pluginConfig.configPath, JSON.stringify(config, null, 2));
            }

            log.info('Display name has been changed to: %s', match[1]);
        }
    },

    /**
     * Command: !set state <stateName>
     */
    setState: {
        description: '!set state {stateName} | Changes bot\'s online state.',
        // "Looking To Trade" is the longest state name so 16 characters should be sufficient
        regex: /^!set state ([a-zA-Z ]{1,16})/,
        action: function(VaporAPI, user, match) {
            var log = VaporAPI.getLogger();
            var Steam = VaporAPI.getSteam();
            var steamFriends = VaporAPI.getHandler('steamFriends');
            var utils = VaporAPI.getUtils();

            var pluginConfig = VaporAPI.data || {};

            var state = utils.stringToEnum(match[1], Steam.EPersonaState);

            if(state !== null) {
                var description = utils.enumToString(state, Steam.EPersonaState);
                var config = VaporAPI.getConfig();

                steamFriends.setPersonaState(state);
                config.state = description;

                if(pluginConfig.configPath) {
                    fs.writeFileSync(pluginConfig.configPath, JSON.stringify(config, null, 2));
                }

                log.info('Online state has been changed to: %s', description);
            } else {
                steamFriends.sendMessage(user, 'Incorrect state name: ' + match[1]);
            }
        }
    },

    /**
     * Command: !disconnect
     */
    disconnect: {
        description: '!disconnect | Disconnects from Steam network.',
        regex: /^!disconnect$/,
        action: function(VaporAPI) {
            VaporAPI.getLogger().info('Disconnecting from Steam network.');
            VaporAPI.disconnect();
        }
    },

    /**
     * Command: !help
     */
    help: {
        description: '!help | Lists all available admin commands',
        regex: /^!help$/,
        action: function(VaporAPI, user) {
            var commands = require('./commands.js'); // This is not ideal
            var steamFriends = VaporAPI.getHandler('steamFriends');

            var response = 'List of commands:\n';
            for(var command in commands) {
                response += '* ' + commands[command].description + '\n';
            }

            steamFriends.sendMessage(user, response);
        }
    }
};

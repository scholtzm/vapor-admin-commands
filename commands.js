module.exports = {

    /**
     * Command: !set state <stateName>
     */
    setState: {
        description: "!set name {displayName} | Changes bot's display name. Limit for the name is 32 characters.",
        // "Looking To Trade" is the longest state name so 16 characters should be sufficient
        regex: /^!set state ([a-zA-Z ]{1,16})/,
        action: function(VaporAPI, user, match) {
            var Steam = VaporAPI.getSteam();
            var steamFriends = VaporAPI.getHandler('steamFriends');

            var utils = VaporAPI.getUtils();
            var log = VaporAPI.getLogger();

            var state = utils.stringToEnum(match[1], Steam.EPersonaState);

            if(state !== null) {
                var description = utils.enumToString(state, Steam.EPersonaState);
                var config = VaporAPI.getConfig();

                steamFriends.setPersonaState(state);

                config.state = description;
                VaporAPI.saveConfig(config);

                log.info("Online state has been changed to: " + description);
            } else {
                steamFriends.sendMessage(user, "Incorrect state name: " + match[1]);
            }
        }
    },

    /**
     * Command: !set name <displayName>
     */
    setName: {
        description: "!set state {stateName} | Changes bot's online state.",
        // Maximum name length is 32 characters
        regex: /^!set name (.{1,32})/,
        action: function(VaporAPI, user, match) {
            var steamFriends = VaporAPI.getHandler('steamFriends');
            var log = VaporAPI.getLogger();
            var config = VaporAPI.getConfig();

            steamFriends.setPersonaName(match[1]);

            config.displayName = match[1];
            VaporAPI.saveConfig(config);

            log.info("Display name has been changed to: " + match[1]);
        }
    },

    /**
     * Command: !shutdown
     */
    shutdown: {
        description: "!shutdown | Disconnects from Steam network and shuts down Vapor.",
        regex: /^!shutdown$/,
        action: function(VaporAPI) {
            var log = VaporAPI.getLogger();

            log.info("Shutting down Vapor.");

            VaporAPI.shutdown();
        }
    },

    /**
     * Command: !help
     */
    help: {
        description: "!help | Lists all available admin commands",
        regex: /^!help$/,
        action: function(VaporAPI, user) {
            var commands = require('./commands.js'); // This is not ideal
            var steamFriends = VaporAPI.getHandler('steamFriends');

            var response = "List of commands:\n";
            for(var command in commands) {
                response += "* " + commands[command].description + "\n";
            }

            steamFriends.sendMessage(user, response);
        }
    }
};

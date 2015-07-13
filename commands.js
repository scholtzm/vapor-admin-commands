module.exports = {

    /**
     * Command: !set state <stateName>
     */
    setState: {
        // "Looking To Trade" is the longest state name so 16 characters should be sufficient
        regex: /^!set state ([a-zA-Z ]{1,16})/,
        action: function(VaporAPI, user, match) {
            var utils = VaporAPI.getUtils();
            var Steam = VaporAPI.getSteam();
            var client = VaporAPI.getClient();
            var log = VaporAPI.getLogger();

            var state = utils.stringToEnum(match[1], Steam.EPersonaState);

            if(state !== null) {
                client.setPersonaState(state);
                log.info("Online state has been changed.");
            } else {
                client.sendMessage(user, "Incorrect state name: " + match[1]);
            }
        }
    },

    /**
     * Command: !set name <displayName>
     */
    setName: {
        // Maximum name length is 32 characters
        regex: /^!set name (.{1,32})/,
        action: function(VaporAPI, user, match) {
            var client = VaporAPI.getClient();
            var log = VaporAPI.getLogger();

            client.setPersonaName(match[1]);
            log.info("Display name has been changed to: " + match[1]);
        }
    }
};

var commands = {
    setOnlineStatus: {
        regex: /^!set status ([0-7]{1})/,
        action: function(client, match) {}
    },
    setName: {
        regex: /^!set name (.{1,32})/,
        action: function(client, match) {
            client.setPersonaName(match[1]);
        }
    }
};

function processMessage(client, user, message) {
    for(var command in commands) {
        if(commands[command].regex.test(message)) {
            var match = commands[command].regex.exec(message);
            commands[command].action(client, match);
        }
    }
}

module.exports = function(VaporAPI) {
    var client = VaporAPI.getClient();
    var utils = VaporAPI.getUtils();
    var Steam = VaporAPI.getSteam();

    VaporAPI.registerHandler({
            emitter: 'steam',
            event: 'friendMsg'
        },
        function(user, message, type) {
            if(type === Steam.EChatEntryType.ChatMsg && utils.isAdmin(user)) {
                processMessage(client, user, message);
            }
        }
    );

};

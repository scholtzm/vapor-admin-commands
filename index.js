var commands = require('./commands');

function processMessage(VaporAPI, user, message) {
    for(var command in commands) {
        if(commands[command].regex.test(message)) {
            var match = commands[command].regex.exec(message);
            commands[command].action(VaporAPI, user, match);
        }
    }
}

module.exports = function(VaporAPI) {
    var utils = VaporAPI.getUtils();
    var Steam = VaporAPI.getSteam();

    VaporAPI.registerHandler({
            emitter: 'steam',
            event: 'friendMsg'
        },
        function(user, message, type) {
            if(type === Steam.EChatEntryType.ChatMsg && utils.isAdmin(user)) {
                processMessage(VaporAPI, user, message);
            }
        }
    );

};

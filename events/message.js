//used for commands
const Enmap = require("enmap");
db_commands = new Enmap({name: "commands"});
const commandsArray = db_commands.get('commands');
const config = require("../config.json");
const prefix = config.prefix;

module.exports = async (client, message) => {

    if (message.author.bot || message.channel.type == 'dm') return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!commandsArray.includes(command)) return;

    try {
        delete require.cache[require.resolve(`../commands/${command}.js`)];
        let commandFile = require(`../commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (e) {
        console.log(e.stack);
    }


};
//Used for embeds because I'm lazy
const Discord = require("discord.js");

const {
  Client
} = require("discord.js");
const client = new Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

// Why enmaps you might ask? Yes
const Enmap = require("enmap");
const fs = require('fs');

//config section
const config = require("./config.json");
const prefix = config.prefix;

let commandsArray;


client.on("ready", async () => {
  console.log("Time to punish :o");
});


//main command (probably wil update to a handler)
/*
client.on('message', message => {
  if (message.author.bot || message.channel.type == 'dm') return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (!commandsArray.includes(command)) return;

  try {
    delete require.cache[require.resolve(`./commands/${cmd}.js`)];
    let commandFile = require(`./commands/${cmd}.js`)
    commandFile.run(client, message, args);
  } catch (e) {
    console.log(e.stack);
  }
});*/

//load commands into array
commandsArray = [];
db_commands = new Enmap({name: "commands"});
fs.readdir('./commands/', async (err, files) => {
  if (err) return console.error;
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    let moduleName = file.split('.')[0];
    commandsArray.push(moduleName);
    console.log(`Loaded command -> ${moduleName}`);
  })
  console.log(` `);
  console.log(`Command List: ${commandsArray}`);
  db_commands.set('commands', commandsArray);
});

//load events
fs.readdir('./events/', (err, files) => {
  if (err) return console.error;
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    const evt = require(`./events/${file}`);
    let evtName = file.split('.')[0];
    console.log(`Loaded event '${evtName}'`);
    client.on(evtName, evt.bind(null, client));
  });
});


//react events coming soon tm

//login
client.login(config.token);
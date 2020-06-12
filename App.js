
const {Client} = require("discord.js");
const client = new Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION']});

// Why enmaps you might ask? Yes
const Enmap = require("enmap");
const fs = require('fs');

//config section
const config = require("./config.json");
const prefix = config.prefix;

client.on("ready", () => {
  console.log("Bot Status: Time to punish :o");
});

// load commands into array and push to 
// enmap for use in messsage event
let commandsArray = [];
db_commands = new Enmap({name: "commands"});
fs.readdir('./commands/', async (err, files) => {
  if (err) return console.error;
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    let moduleName = file.split('.')[0];
    commandsArray.push(moduleName);
    console.log(`Loaded command -> '${moduleName}'`);
  })
  db_commands.set('commands', commandsArray);
});

//load events and bind
fs.readdir('./events/', (err, files) => {
  if (err) return console.error;
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    const evt = require(`./events/${file}`);
    let evtName = file.split('.')[0];
    console.log(`Loaded event -> '${evtName}'`);
    client.on(evtName, evt.bind(null, client));
  });
});

//login
client.login(config.token);
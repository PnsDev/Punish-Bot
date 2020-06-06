//Used for embeds because I'm lazy
const Discord = require("discord.js");

const {Client} = require("discord.js");
const client = new Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION']});

// Why enmaps you might ask? Yes
const Enmap = require("enmap");

//config section
const config = require("./config.json");
const prefix =  config.prefix;


client.on("ready", async () => {
  console.log("Time to punish :o");
});


//main command (probably wil update to a handler)
client.on("message", async message => {
  if (message.author.bot || message.channel.type == 'dm') return;
});

//react events coming soon tm

//login
client.login(config.token);
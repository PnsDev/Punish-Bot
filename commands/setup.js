const Discord = require("discord.js");
const Enmap = require("enmap");
const Utils = require('../Utils/discUtils');

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) {
    message.channel.send(Utils.embedMsg(message, 'This command requires **ADMINISTRATOR**', 'No Permission', '#f04947', false, true));
    return;
  }
  const role = await message.guild.roles.cache.find(role => role.name === 'Muted');
  if (role == undefined) {
    message.channel.send(Utils.embedMsg(message, 'No role with the name "Muted" could be found.\n\nPlease create one and run the command\n*(This role can be renamed after you run the command)*', 'Error - No Role Found', '#f04947', false, true));
    return;
  }
  const settings = {
    modlogs: message.channel.id,
    mutedrole: role.id
  }
  db_settings = new Enmap({
    name: "guild-settings"
  });
  db_settings.set(message.guild.id, settings);
  message.channel.send(Utils.embedMsg(message, `Bot Setup!\n\n**Modlog Channel**: ${settings.modlogs} *(this one)*\n**Muted Role**: ${settings.mutedrole}`, 'Success', '#5bf057', '%id%', true));
}
const Discord = require("discord.js");
 
module.exports.run = async (client, message, args) => {
    const ping = new Date().getTime() - message.createdTimestamp;
    //fancy color for the embed
    let embedColor;
    if (ping >= 1000) embedColor = '#f3474b';
    else if (ping >= 500) embedColor = '#eca013';
    else embedColor = '#eca013';
    const embed = new Discord.MessageEmbed()
      .setColor(embedColor)
      .setAuthor(message.author.tag , message.author.displayAvatarURL())
      .setTitle('Pong!')
      .setDescription(`The response time is **${ping} ms**`)
      .setTimestamp();
    message.channel.send(embed);


}

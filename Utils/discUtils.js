const Discord = require("discord.js");

module.exports = {
    embedMsg: function (message, content, author, color, footer, time) {
        let embed = new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(content);
        if (author == '%tag%') embed = new Discord.MessageEmbed(embed).setAuthor(message.author.tag, message.author.displayAvatarURL());
        else if (author != false) embed = new Discord.MessageEmbed(embed).setAuthor(author, message.author.displayAvatarURL());
        if (footer == '%id%') embed = new Discord.MessageEmbed(embed).setFooter(message.author.id);
        else if (footer != false) embed = new Discord.MessageEmbed(embed).setFooter(footer);
        if (time == true) embed = new Discord.MessageEmbed(embed).setTimestamp();

        
        return embed;
    }
}
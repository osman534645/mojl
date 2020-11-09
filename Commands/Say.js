const { MessageEmbed } = require('discord.js');
const qdb = require('quick.db');
const ayar = require('../settings.json');

module.exports.execute = async (client, message, args) => {
    let embed = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp().setColor("RANDOM").setFooter('Resital 🤍 FlowArt');
    if(!ayar.tag) return message.channel.send(embed.setDescription("Sistem ayarlanmamış!")).then(x => x.delete({timeout: 5000}));

    var tagdakiler = 0;
    let tag = `${ayar.tag || ""}`;
    message.guild.members.cache.forEach(member => {
      if(member.user.username.includes(tag)) {
        tagdakiler = tagdakiler+1
      }  
    })  
    message.channel.send(embed.setDescription(`\`>\` Sunucumuzda Toplam **${message.guild.memberCount}** Kişi Bulunmaktadır.
    \`>\` Tagımızıda Toplam **${tagdakiler}** Kişi Bulunmaktadır.
    \`>\` Sesli Kanallarımızda Toplam **${message.guild.channels.cache.filter(channel => channel.type == "voice").map(channel => channel.members.size).reduce((a, b) => a + b)}** Kişi Bulunmaktadır.`));
};

module.exports.configuration = {
    name: "say",
    aliases: ["count","yoklama"],
    usage: "say",
    description: "Sunucu sayımı."
};
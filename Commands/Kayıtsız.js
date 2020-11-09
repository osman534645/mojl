const { MessageEmbed } = require('discord.js');
const qdb = require('quick.db');
const ayar = require('../settings.json');

module.exports.execute = async (client, message, args) => {
  let embed = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp().setColor("RANDOM").setFooter('Resital 🤍 FlowArt');
  if (!message.member.roles.cache.has(ayar.kayıtsorumlusu) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)).then(x => x.delete({timeout: 10000}));
  let resital = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!resital) return message.channel.send(embed.setDescription(`Komutu doğru kullanmalısın! \`Örnek: ${ayar.prefix || '.'}kayıtsız @üye\``)).then(x => x.delete({timeout: 10000}));
  message.member.roles.set(ayar.kayitsizRolu || []).catch();
  message.channel.send(embed.setDescription(`${resital} üyesi, ${message.author} tarafından kayıtsıza atıldı!`)).catch();
};
module.exports.configuration = {
  name: "kayıtsız",
  aliases: [],
  usage: "kayıtsız @Resitâl/ID",
  description: "Belirtilen üyeyi kayıtsıza atar."
};
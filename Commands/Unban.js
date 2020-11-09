const { MessageEmbed } = require('discord.js');
const ayar = require('../settings.json');

module.exports.execute = async (client, message, args) => {
  let embed = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp().setColor("RANDOM").setFooter('Resital 🤍 FlowArt');
  if (!message.member.roles.cache.has(ayar.banHammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)).then(x => x.delete({timeout: 10000}));
  if (!args[0] || isNaN(args[0])) return message.channel.send(embed.setDescription(`Komutu doğru kullanmalısın! \`Örnek: ${ayar.prefix || '.'}unban id sebep\``)).then(x => x.delete({timeout: 5000}));
  let kisi = await client.users.fetch(args[0]);
  if(kisi) {
    let reason = args.splice(1).join(" ") || "Belirtilmedi";
    message.guild.members.unban(kisi.id).catch(err => message.channel.send(embed.setDescription("O id'ye ait ban bulunamadı!")).then(x => x.delete({timeout: 5000})));
    client.channels.cache.get(ayar.banlog).send(new MessageEmbed().setDescription(`**Banı Kaldırılan Üye:** ${kisi.tag} \`${kisi.id}\`\n**Kaldıran Yetkili:** ${message.author} \`${message.author.id}\``));
  } else {
    message.channel.send(embed.setDescription("Düzgün bir id girmelisin!")).then(x => x.delete({timeout: 5000}));
  };
};
module.exports.configuration = {
  name: "unban",
  aliases: ["yasak-kaldır"],
  usage: "unban ID [isterseniz sebep]",
  description: "Belirtilen kişinin banını kaldırır."
};
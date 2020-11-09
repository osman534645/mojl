const { MessageEmbed } = require('discord.js');
const qdb = require('quick.db');
const kdb = new qdb.table("kullanici");
const ayar = require('../settings.json');

module.exports.execute = async (client, message, args) => {
  let embed = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp().setColor("RANDOM").setFooter('Resital 🤍 FlowArt');
  if (!message.member.roles.cache.has(ayar.kickHammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)).then(x => x.delete({timeout: 10000}));
 
  let resart = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let reason = args.splice(1).join(" ") || "Belirtilmemiş"
  if (!resart || !reason) return message.channel.send(embed.setDescription(`Komutu doğru kullanmalısın! \`Örnek: ${ayar.prefix || '.'}kick @üye sebep\``))
 
  if (!resart) {
    let kisi = await client.users.fetch(args[0]);
    if(kisi) {
      message.guild.members.kick(kisi.id, {reason: reason}).catch();
    kdb.add(`kullanici.${message.author.id}.kick`, 1);
    kdb.push(`kullanici.${resart.id}.sicil`, {
      Yetkili: message.author.id,
      Tip: "KICK",
      Sebep: reason,
      Zaman: Date.now()
    });
      client.channels.cache.get(ayar.kicklog).send(embed.setDescription(`**${resart.user.tag}** adlı üye **${reason}** sebebiyle ${message.author} tarafından **atıldı.**`));
      } else {
      message.channel.send(embed.setDescription(`Komutu doğru kullanmalısın! \`Örnek: ${ayar.prefix || '.'}kick @üye sebep\``)).then(x => x.delete({timeout: 5000}));
    };
    return message.reply(`Komutu doğru kullanmalısın! \`Örnek: ${ayar.prefix || '.'}kick @üye sebep\``).then(x => x.delete({timeout: 5000}));
  };
  resart.send(embed.setDescription(`${message.author} tarafından **${reason}** sebebiyle sunucudan atıldın.`)).catch();
  resart.kick({reason: reason})
  kdb.add(`kullanici.${message.author.id}.kick`, 1);
    kdb.push(`kullanici.${resart.id}.sicil`, {
      Yetkili: message.author.id,
      Tip: "KICK",
      Sebep: reason,
      Zaman: Date.now()
    });
  message.channel.send(embed.setDescription(`**${resart.user.tag}** üyesi **${reason}** sebebiyle **atıldı!**`));
  client.channels.cache.get(ayar.kicklog).send(embed.setDescription(`**${resart.user.tag}** adlı üye **${reason}** sebebiyle ${message.author} tarafından **atıldı.**`));
};
  
module.exports.configuration = {
  name: "kick",
  aliases: ["at"],
  usage: "kick @Resitâl/ID [sebep]",
  description: "Belirtilen üyeyi sunucudan atar."
};
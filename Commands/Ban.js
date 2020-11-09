const { MessageEmbed } = require('discord.js');
const qdb = require('quick.db');
const kdb = new qdb.table("kullanici");
const ayar = require('../settings.json');

module.exports.execute = async (client, message, args) => {
  let embed = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp().setColor("RANDOM").setFooter('Resital 🤍 FlowArt');
  if (!message.member.roles.cache.has(ayar.banHammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)).then(x => x.delete({timeout: 10000}));
 
  if(args[0] && args[0].includes('list')) {
    try {
      message.guild.fetchBans().then(bans => {
        message.channel.send(embed.setDescription(`Yasaklanan kullanıclar;\n\n${bans.map(c => `**${c.user.tag}** = **${c.user.id}**`).join("\n")}\n\nToplam **${bans.size}** adet yasaklanmış kullanıcı bulunuyor.`, {code: 'xl', split: true}));
      });
	  } catch (err) { message.channel.send(`Yasaklı kullanıcı bulamadım!`).then(x => x.delete({timeout: 5000}));; }
    return;
  };
  
  if (args[0] && (args[0].includes('bilgi') || args[0].includes('info'))) {
    if(!args[1] || isNaN(args[1])) return message.channel.send(embed.setDescription(`Bir ID Belirtmelisin!`)).then(x => x.delete({timeout: 5000}));;
    return message.guild.fetchBan(args.slice(1).join(' ')).then(({ user, reason }) => message.channel.send(embed.setDescription(`**Banlanan Üye:** \`${user.tag} = ${user.id}\`\n**Ban Sebebi:** \`${reason ? reason : "Belirtilmemiş!"}\``))).catch(err => message.channel.send(embed.setDescription("O ID'ye ait banlanan üye bulunamadı!")).then(x => x.delete({timeout: 5000})));
  };

  let resart = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let reason = args.splice(1).join(" ") || "Belirtilmemiş"
  if (!resart || !reason) return message.channel.send(embed.setDescription(`Komutu doğru kullanmalısın! \`Örnek: ${ayar.prefix || '.'}ban @üye sebep\``))
 
  if (!resart) {
    let kisi = await client.users.fetch(args[0]);
    if(kisi) {
      message.guild.members.ban(kisi.id, {reason: reason}).catch();
      kdb.add(`kullanici.${message.author.id}.ban`, 1);
      kdb.push(`kullanici.${resart.id}.sicil`, {
        Yetkili: message.author.id,
        Tip: "BAN",
        Sebep: reason,
        Zaman: Date.now()
      });
      client.channels.cache.get(ayar.banlog).send(embed.setDescription(`**${resart.user.tag}** adlı üye **${reason}** sebebiyle ${message.author} tarafından **yasaklandı.**\n\`Detaylı bilgi almak isterseniz, ${ayar.prefix || '.'}ban info ${resart.id}\``));
      } else {
      message.channel.send(embed.setDescription(`Komutu doğru kullanmalısın! \`Örnek: ${ayar.prefix || '.'}ban @üye sebep\``)).then(x => x.delete({timeout: 5000}));
    };
    return message.reply(`Komutu doğru kullanmalısın! \`Örnek: ${ayar.prefix || '.'}ban @üye sebep\``).then(x => x.delete({timeout: 5000}));
  };
  resart.send(embed.setDescription(`${message.author} tarafından **${reason}** sebebiyle sunucudan banlandın.`)).catch();
  resart.ban({reason: reason})
  kdb.add(`kullanici.${message.author.id}.ban`, 1);
  kdb.push(`kullanici.${resart.id}.sicil`, {
      Yetkili: message.author.id,
      Tip: "BAN",
      Sebep: reason,
      Zaman: Date.now()
    });
  message.channel.send(embed.setDescription(`**${resart.user.tag}** üyesi **${reason}** sebebiyle **yasaklandı!**`));
  client.channels.cache.get(ayar.banlog).send(embed.setDescription(`**${resart.user.tag}** adlı üye **${reason}** sebebiyle ${message.author} tarafından **yasaklandı.**\n\`Detaylı bilgi almak isterseniz, ${ayar.prefix || '.'}ban info ${resart.id}\``));
};
  
module.exports.configuration = {
  name: "ban",
  aliases: ["yasakla"],
  usage: "ban @Resitâl/ID [sebep] / liste / bilgi @Resitâl/ID",
  description: "Belirtilen üyeyi sunucudan yasaklar."
};
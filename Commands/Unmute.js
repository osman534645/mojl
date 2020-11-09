const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const moment = require('moment')
const db = new qdb.table("ayarlar");
const jdb = new qdb.table("cezalar");
const kdb = new qdb.table("kullanici");
const ms = require('ms');
const ayar = require('../settings.json');

module.exports.execute = async (client, message, args) => {
  
  let embed = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp().setColor("RANDOM").setFooter('Resital 🤍 FlowArt');
  if (!message.member.roles.cache.has(ayar.muteHammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)).then(x => x.delete({timeout: 10000}));
  let resital = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!resital) return message.channel.send(embed.setDescription(`Komutu doğru kullanmalısın! \`Örnek: ${ayar.prefix || '.'}unmute @üye süre sebep\``)).then(x => x.delete({timeout: 5000}));

  if(!args[1]) return message.channel.send(embed.setDescription('Geçerli bir süre (1s/1m/1h/1d) ve sebep belirtmelisin!'));
  let timereplace = args[1];
  let time = timereplace.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')
    
  db.add('case', 1)
  const resital1 = await db.fetch('case')
   
  resital.roles.set([`${ayar.kayitsizRolu}`])
  client.channels.cache.get(ayar.mutelog).send(embed.setDescription(`${resital} \`${resital.user.id}\` üyesinin metin kanallarında bulunan susturulması ${message.author} tarafından kaldırıldı.`))
  message.channel.send(`${resital} üyesinin metin kanallarında bulunan susturması kaldırıldı. \`#${resital1}\``)
};
module.exports.configuration = {
  name: "unmute",
  aliases: ['unsusturma', 'susturaç', "açsusturma","susturmaaç"],
  usage: "unmute @Resitâl/ID",
  description: "Belirtilen üyenin mutesini kaldırır."
};
const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const jdb = new qdb.table("cezalar");
const db = new qdb.table("ayarlar");
const kdb = new qdb.table("kullanici");
const ayar = require('../settings.json');

module.exports.execute = async (client, message, args) => {
  
  let embed = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp().setColor("RANDOM").setFooter('Resital 🤍 FlowArt');
  if (!message.member.roles.cache.has(ayar.jailHammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)).then(x => x.delete({timeout: 10000}));
  let resital = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!resital) return message.channel.send(embed.setDescription(`Komutu doğru kullanmalısın! \`Örnek: ${ayar.prefix || '.'}unjail @üye\``)).then(x => x.delete({timeout: 5000}));
  db.add('case', 1)
  const resital1 = await db.fetch('case')

  if(resital.voice.channel) resital.voice.kick().catch();
  message.channel.send(embed.setDescription(`${resital} üyesinin <@&${ayar.jailRolü}> rolü alındı. \`#${resital1}\``)).catch();
  resital.roles.set([`${ayar.kayitsizRolu}`])
  client.channels.cache.get(ayar.jaillog).send(embed.setDescription(`${resital} \`${resital.user.id}\` <@&${ayar.jailRolü}> rolü ${message.author} tarafından alındı.
`)).catch();
};
module.exports.configuration = {
  name: "unjail",
  aliases: [],
  usage: "unjail @Resitâl/ID",
  description: "Belirtilen üyeyi jailden çıkarır."
};
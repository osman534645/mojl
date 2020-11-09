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
  if (!resital) return message.channel.send(embed.setDescription(`Komutu doğru kullanmalısın! \`Örnek: ${ayar.prefix || '.'}mute @üye süre sebep\``)).then(x => x.delete({timeout: 5000}));
  if(!args[1]) return message.channel.send(embed.setDescription('Geçerli bir süre (1s/1m/1h/1d) ve sebep belirtmelisin!'));
 
  let timereplace = args[1];
  let time = timereplace.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat')
    
  let reason;
  if(!args[2]) reason = 'Belirtilmedi!'
  if(args[2]) reason = args.slice(2).join(' ')

  db.add('case', 1)
  const resital1 = await db.fetch('case')

  var tarih = new Date(Date.now())
  var tarih2 = ms(timereplace)
  var tarih3 = Date.now() + tarih2 + 10800000

  let atılmaay = moment(Date.now()+10800000).format("MM")
  let atılmagün = moment(Date.now()+10800000).format("DD")
  let atılmasaat = moment(Date.now()+10800000).format("HH:mm:ss")
  let bitişay = moment(tarih3).format("MM")
  let bitişgün = moment(tarih3).format("DD")
  let bitişsaat = moment(tarih3).format("HH:mm:ss")
  let muteatılma = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
  let mutebitiş = `\`${bitişgün} ${bitişay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${bitişsaat}\``

  moment.locale('tr');

    message.channel.send(`${resital} ${time} boyunca ses kanallarında susturuldu. \`#${resital1}\``)
      if(resital.voice.channel) resital.voice.setMute(true)
      kdb.push(`kullanici.${resital.id}.sicil`, {
        Yetkili: message.author.id,
        Tip: "SMUTE",
        Sebep: reason,
        Zaman: Date.now()
      });  
      client.channels.cache.get(ayar.mutelog).send(embed.setDescription(`${resital} \`${resital.user.id}\` üyesi ses kanallarında susturuldu.
    
    • Mute Atılma: ${muteatılma}
    • Mute Bitiş: ${mutebitiş}
    • Süre: \`${time}\`
    • Sebep: \`${reason}\`
    `)) 

  setTimeout(async () => {
      if(resital.voice.channel) resital.voice.setMute(false)
      client.channels.cache.get(ayar.mutelog).send(embed.setDescription(`${resital} \`${resital.user.id}\` üyesinin ses kanallarında bulunan ${time} susturulması otomatik kaldırıldı.
    
    • Mute Atılma: ${muteatılma}
    • Mute Bitiş: ${mutebitiş}
    • Süre: \`${time}\`
    • Sebep: \`${reason}\`
    `)) }
      , ms(timereplace))
      
    };

module.exports.configuration = {
  name: "sesmute",
  aliases: ['ses-mute', 'voice-mute', 'sestesustur'],
  usage: "sesmute @Resitâl/ID [süre] [sebep]",
  description: "Belirtilen üyeyi seste belirtilen süre kadar muteler."
};
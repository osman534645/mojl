const { MessageEmbed } = require('discord.js');
const qdb = require('quick.db');
const rdb = new qdb.table("teyitler");
const kdb = new qdb.table("kullanici");
const ayar = require('../settings.json');

module.exports.execute = async (client, message, args) => {
  
  let embed = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp().setColor("RANDOM").setFooter('Resital 🤍 FlowArt');
  if (!message.member.roles.cache.has(ayar.kayıtsorumlusu) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)).then(x => x.delete({timeout: 10000}));
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    let sicil = kdb.get(`kullanici.${member.id}.sicil`) || [];
    sicil = sicil.reverse();
    let listedPenal2 = sicil.length > 0 ? sicil.map((value, index) => `\`${index + 1}.\` **[${value.Tip}]** ${new Date(value.Zaman).toTurkishFormatDate()} tarihinde **${value.Sebep}** sebebiyle ${message.guild.members.cache.has(value.Yetkili) ? message.guild.members.cache.get(value.Yetkili) : value.Yetkili} tarafından cezalandırıldı.`).join("\n") : "Güvenilir!";

    let data = kdb.get(`isimler.${member.id}`);
    let listedData = data.length > 0 ? data.map((value, index) => `\`${index + 1}.\` **${value.guildName}** ismiyle \`${new Date(value.Zaman).toTurkishFormatDate()}\` tarihinde ${message.guild.members.cache.has(value.Yetkili) ? message.guild.members.cache.get(value.Yetkili) : "Bulunamadı."} tarafından **${value.Komut}** olarak kaydolmuş!`) : "Bu Üyenin Geçmişi Bulunamadı.";
    message.channel.send(embed.setDescription(`${listedData.join("\n")}`));

    
};

module.exports.configuration = {
    name: "sorgula",
    aliases: ["sorgula"],
    usage: "sorgula @Resitâl/ID",
    description: "Belirtilen üyenin geçmiş isimlerine bakarsınız."
};
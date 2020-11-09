const { MessageEmbed } = require('discord.js');
const qdb = require('quick.db');
const rdb = new qdb.table("teyitler");
const kdb = new qdb.table("kullanici");
const ayar = require('../settings.json');

module.exports.execute = async (client, message, args) => {
  
  let embed = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp().setColor("RANDOM").setFooter('Resital 🤍 FlowArt');
  if (!message.member.roles.cache.has(ayar.kayıtsorumlusu) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)).then(x => x.delete({timeout: 10000}));
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let isim = args[1];
  let yaş = Number (args[2]);
  let yaziIsım = `${ayar.tag || ""} ${isim} | ${yaş}`
  
    if (!member || !isim || !yaş) return message.channel.send(embed.setDescription(`Komutu doğru kullanmalısın! \`Örnek: ${ayar.prefix || '.'}i @üye isim yaş\``)).then(x => x.delete({timeout: 10000}));
    member.setNickname(`${ayar.tag || ""} ${isim} | ${yaş}`).catch();
      kdb.push(`isimler.${member.id}`, {
        guildName: `${ayar.tag || ""} ${isim} | ${yaş}`,
        Name: isim,
        Age: yaş,
        Zaman: Date.now(),
        Yetkili: message.author.id,
        Komut: 'İsim Değiştirme'
    });
        let data = kdb.get(`isimler.${member.id}`);
      let listedData = data.length > 0 ? data.map((value, index) => ` \`${value.guildName}\` Yetkili ${message.guild.members.cache.has(value.Yetkili) ? message.guild.members.cache.get(value.Yetkili) : "Bulunamadı."}`) : "Bu Üyenin İsim Geçmişi Bulunamadı.";
      let listedData2 = data.size > 0 ? data.map((value, index) => `\`${index}.\``) : "0";
  message.channel.send(embed.setDescription(`${member} adlı üyenin ismini \`${yaziIsım}\`olarak ayarladım!\n\nKullanıcının veri tabanında ${listedData2} adet isim bulundu. Bunlar;\n${listedData.join("\n") || 'Veri Bulunamadı!'}\n\nKullanıcıların geçmişine bakmak için \`${ayar.prefix || '.'}isimler @Resitâl/ID\` komutu kullanbilirsiniz!`));


 let komut;
 if (member.roles.cache.has(ayar.erkekrol1) && !member.roles.cache.has(ayar.kadınrol1)) komut = "Erkek"
 if (member.roles.cache.has(ayar.kadınrol1) && !member.roles.cache.has(ayar.erkekrol1)) komut = "Kadın"
 if (!member.roles.cache.has(ayar.erkekrol1) && !member.roles.cache.has(ayar.kadınrol1)) komut = "Bulunamadı"  

};

module.exports.configuration = {
    name: "isim",
    aliases: ["nick", "i"],
    usage: "isim @Resitâl/ID [isim] [yaş]",
    description: "Belirtilen üyenin sunucudaki ismini değiştirir."
};

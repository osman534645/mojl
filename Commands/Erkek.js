const { MessageEmbed } = require('discord.js');
const qdb = require('quick.db');
const rdb = new qdb.table("teyitler");
const kdb = new qdb.table("kullanici");
const ayar = require('../settings.json');

module.exports.execute = async (client, message, args) => {
  
  let embed = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp().setColor("RANDOM").setFooter('Resital 🤍 FlowArt');
  let olumsuz = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp().setColor("RED").setFooter('Resital 🤍 FlowArt');
  if (!message.member.roles.cache.has(ayar.kayıtsorumlusu) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`)).then(x => x.delete({timeout: 10000}));
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let isim = args[1];
  let yaş = Number (args[2]);
  
    if (!member || !isim || !yaş) return message.channel.send(embed.setDescription(`Komutu doğru kullanmalısın! \`Örnek: ${ayar.prefix || '.'}e @üye isim yaş\``)).then(x => x.delete({timeout: 10000}));

            member.setNickname(`${ayar.tag || ""} ${isim} | ${yaş}`).catch();
            let erkekRol = message.guild.roles.cache.get(ayar.erkekrol1);
            if (erkekRol) {
                member.roles.cache.has(ayar.boosterRol) ? member.roles.set([ayar.boosterRol, ayar.erkekrol1]) : member.roles.set([ayar.erkekrol1]);
            }
  
            if (member.user.username.includes(ayar.tag) && !member.roles.cache.has(ayar.tagrolü)) {
                member.roles.add(ayar.tagrolü);
            }
    
            rdb.add(`reg.${message.author.id}.erkek`, +1);
            kdb.push(`isimler.${member.id}`, {
                guildName: `${ayar.tag || ""} ${isim} | ${yaş}`,
                Name: isim,
                Age: yaş,
                Zaman: Date.now(),
                Yetkili: message.author.id,
                Komut: "Erkek"
            });
      let data = kdb.get(`isimler.${member.id}`);
    let listedData = data.length > 0 ? data.map((value, index) => `\`${value.guildName}\` ismiyle ${message.guild.members.cache.has(value.Yetkili) ? message.guild.members.cache.get(value.Yetkili) : "Bulunamadı."} **${value.Komut}** olarak kayıt etmiş.`) : "Bu Üyenin Geçmişi Bulunamadı.";
    message.channel.send(embed.setDescription(`${member} adlı üyeyi **Erkek** olarak kayıt edip, ismini \`${ayar.tag || ""} ${isim} | ${yaş}\` olarak ayarladım!\n\nDaha önceden;\n ${listedData.splice(0, 30).join("\n")}`))
    client.channels.cache.get(ayar.chat).send(`${member} aramıza katıldı!`)
    message.react("✅")
}

module.exports.configuration = {
    name: "erkek",
    aliases: ["e"],
    usage: "erkek @Resitâl/ID [isim] [yaş]",
    description: "Belirtilen üyeyi sunucuya erkek olarak kaydını gerçekleştirmiş olursunuz."
};

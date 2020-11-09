const { Discord, MessageEmbed } = require('discord.js');
const ayar = require("../settings.json");
const moment = require("moment");
module.exports = (member) => {

    let sunucu = client.guilds.cache.get(ayar.sunucuID);
    let logKanal = sunucu.channels.cache.get(ayar.kayitKanal);
    let kayitSorumlusu = sunucu.roles.cache.get(ayar.kayitsorumlusu);

let memberGün = moment(member.user.createdAt).format("DD");
let memberTarih = moment(member.user.createdAt).format("YYYY HH:mm:ss");
let memberAylar = moment(member.user.createdAt).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık"); 

    if (member.user.bot) {
        member.roles.add(ayar.botRolü);
    }else{
        let durum = Date.now()-member.user.createdTimestamp < 1000 * 60 * 60 * 24 * 7
              if (logKanal) logKanal.send(`
\`>\` Sunucuya hoş geldin ${member}, seninle \`${member.guild.memberCount}\` kişiyiz!
\`>\` Ses kanalına girerek kayıt olabilirsin!
\`>\` Hesabın oluşturulma tarihi: **${memberGün} ${memberAylar} ${memberTarih}**
\`>\` Hesabınız: **${durum ? "Yeni Açılmış!" : "Güvenlir!"}**
\`>\` ${kayitSorumlusu} Seninle ilgilenecektir!
              `);
              member.setNickname(`${ayar.tag || ""} İsim | Yaş`);
        
    if (durum) {
        member.roles.set([ayar.cezaliRolu])
      }else{
    member.roles.set([ayar.kayitsizRolu])
  }
    };


};

module.exports.configuration = {
    name: "guildMemberAdd"
  }

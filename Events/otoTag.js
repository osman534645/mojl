const { Discord, MessageEmbed } = require('discord.js');
const ayar = require('../settings.json');

module.exports = (oldUser, newUser) => {

    if (oldUser.bot || newUser.bot) return;
        let sunucu = client.guilds.cache.get(ayar.sunucuID);
        let logKanal = sunucu.channels.cache.get(ayar.otoTagLogKanal);
        let member = sunucu.members.cache.get(oldUser.id);
        let embed = new MessageEmbed().setTitle(member.user.username, member.user.avatarURL({dynamic: true})).setTimestamp().setFooter(sunucu.name).setColor("GREEN").setFooter('Resital 🤍 FlowArt');
        let embed1 = new MessageEmbed().setTitle(member.user.username, member.user.avatarURL({dynamic: true})).setTimestamp().setFooter(sunucu.name).setColor("RED").setFooter('Resital 🤍 FlowArt');

        if (!oldUser.username.includes(ayar.tag) && newUser.username.includes(ayar.tag)) {
            if (member.manageable) {
                    member.roles.add(ayar.tagrolü);
                        if (logKanal) { logKanal.send(embed.setDescription(`${member} adlı üye tagımızı alarak **Ailemize Katıldı!**`)) }
            }
        };

        if (oldUser.username.includes(ayar.tag) && !newUser.username.includes(ayar.tag)) {
             if (member.manageable) {
                 if (!member.roles.cache.has(ayar.kayitsorumlusu)) {
                     member.roles.remove(ayar.tagrolü);
                     if (logKanal) { logKanal.send(embed1.setDescription(`${member} adlı üye tagımızı bırakarak **Ailemize Ayrıldı!**`)) }
                    }else{
                        if (member.roles.cache.has(ayar.erkekrol1)) {
                            if (logKanal) { logKanal.send(embed1.setDescription(`${member} adlı yetkili tagımızı bıraktığı için kendisinden ekip rolü ve yetkileri alındı.`)) }
                        member.roles.cache.has(ayar.boosterRol) ? member.roles.set([ayar.boosterRol, ayar.erkekrol1]) : member.roles.set([ayar.erkekrol1]);
                        return;
                        }
                        if (member.roles.cache.has(ayar.kadinrol1)) {
                            if (logKanal) { logKanal.send(embed1.setDescription(`${member} adlı yetkili tagımızı bıraktığı için kendisinden ekip rolü ve yetkileri alındı.`)) }
                            member.roles.cache.has(ayar.boosterRol) ? member.roles.set([ayar.boosterRol, ayar.kadinrol1]) : member.roles.set([ayar.kadinrol1]);
                            return;
                        }
                    }
             }
        }

};

module.exports.configuration = {
    name: "userUpdate"
  }
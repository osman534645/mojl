const { MessageEmbed, Discord } = require("discord.js");
const ayarlar = require('../settings.json');
const qdb = require("quick.db");
const db = new qdb.table("kullanici");

module.exports.onLoad = (client) => {
  client.on("message", (message) => {
    if(!message.guild || message.author.bot || message.content.toLowerCase().includes(`${ayarlar.prefix}afk`)) return;
  let embed = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp().setColor("RANDOM").setFooter('Resital 🤍 FlowArt');
    if(message.mentions.users.size >= 1){
      let resital = message.mentions.users.first();
      if(db.has(`${resital.id}.afk`)){
        let data = db.get(`${resital.id}.afk`);
        let time = client.tarihHesapla(data.zaman);
        return message.channel.send(embed.setDescription(`${resital} adlı üye ${data.sebep ? `**${data.sebep}** sebebiyle ` : ""} ${time} AFK! `)).then(x => x.delete({timeout: 10000}));;
      };
    };
    if(!db.has(`${message.author.id}.afk`)) return;
    if(message.member.manageable) message.member.setNickname(message.member.displayName.replace("[AFK]", "")).catch();
    db.delete(`${message.author.id}.afk`);
    message.channel.send(embed.setDescription(`${message.author} Afk modundan başarıyla çıktın!`)).then(x => x.delete({timeout: 5000}));


  });
};

module.exports.execute = async (client, message, args) => {
  let rol = message.mentions.roles.first()
  let sebep = args.slice(0).join(' ') 
  if(sebep.toLowerCase().includes(".com") || sebep.toLowerCase().includes("youtube.com") || sebep.toLowerCase().includes("discord.gg")|| sebep.includes("http") || sebep.includes(rol) || sebep.includes("@here") || sebep.includes("@everyone")) return  [message.delete(10),message.reply("Afk nedenine **link** veya **rol** giremezsin").then(x => x.delete({timeout: 5000}))];  
  if(!sebep) sebep= "Belirtilmemiş!";
  if (sebep) db.set(`${message.author.id}.afk.sebep`, sebep);
  db.set(`${message.author.id}.afk.sure`, new Date());
  if (message.member.manageable) message.member.setNickname(`[AFK]${message.member.displayName}`).catch(console.log);
  message.reply(`Başarıyla AFK moduna girdin, Bir şey yazana kadar AFK Kalıcaksın!`).then(x => x.delete({timeout: 5000}));

};
module.exports.configuration = {
    name: "afk",
    aliases: [],
    usage: "afk [isterseniz sebep]",
    description: "AFK moduna girmenizi sağlar."
};

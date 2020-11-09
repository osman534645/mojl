const { MessageEmbed } = require("discord.js");

module.exports.execute = async(client, message, args, ayar, emoji) => {
  let embed = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp().setColor("RANDOM").setFooter('Resital 🤍 FlowArt');
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription("Bu komutu kullanabilmek için gerekli rollere sahip değilsin!")).then(x => x.delete({timeout: 5000}));
  let everyone = message.guild.roles.cache.find(a => a.name === "@everyone");
  let permObjesi = {};
  let everPermleri = message.channel.permissionOverwrites.get(everyone.id);
  everPermleri.allow.toArray().forEach(p => {
    permObjesi[p] = true;
  });
  everPermleri.deny.toArray().forEach(p => {
    permObjesi[p] = false;
  });
  if(message.channel.permissionsFor(everyone).has('SEND_MESSAGES')) {
    permObjesi["SEND_MESSAGES"] = false;
    message.channel.createOverwrite(everyone, permObjesi);
    message.channel.send(embed.setDescription("Kanal kilitlendi!"))
  } else {
    permObjesi["SEND_MESSAGES"] = null;
    message.channel.createOverwrite(everyone, permObjesi);
    message.channel.send(embed.setDescription("Kanal kilidi açıldı!"));
  };
};
module.exports.configuration = {
    name: "kilit",
    aliases: ["lock"],
    usage: "kilit",
    description: "Komutun kullanıldığı chat kanalını kilitler.",
    permLevel: 0
};
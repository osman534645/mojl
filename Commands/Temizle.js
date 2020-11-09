const { MessageEmbed } = require("discord.js");

module.exports.execute = async(client, message, args, ayar, emoji) => {
  let embed = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp().setColor("RANDOM").setFooter('Resital 🤍 FlowArt');
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(embed.setDescription("Gerekli yetkiye sahip değilsiniz!")).then(x => x.delete({timeout: 5000}));
  if(!args[0] || (args[0] && isNaN(args[0])) || Number(args[0]) < 1 || Number(args[0]) > 100) return message.channel.send(embed.setDescription("1-100 arasında bir miktarı belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  await message.delete().catch();
  message.channel.bulkDelete(Number(args[0])).then(msjlar => message.channel.send(embed.setDescription(`Başarıyla **${msjlar.size}** adet mesaj temizlendi!`)).then(x => x.delete({timeout: 5000}))).catch()
};
module.exports.configuration = {
    name: "temizle",
    aliases: ["sil", 'clear'],
    usage: "temizle 1-100",
    description: "Belirtilen mesaj sayısı kadar mesaj temizler."
};
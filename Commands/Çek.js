const { MessageEmbed } = require("discord.js");

module.exports.execute = async(client, message, args, ayar, emoji) => {
	let resital = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let embed = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp().setColor("RANDOM").setFooter('Resital 🤍 FlowArt');
  if (!resital) return message.channel.send(embed.setDescription("Kimi yanına çekeceksin!")).then(x => x.delete({timeout: 5000}));
  if (!message.member.voice.channel || !resital.voice.channel || message.member.voice.channelID == resital.voice.channelID) return message.channel.send(embed.setDescription("Çekmek istediğin kişi seste değil!")).then(x => x.delete({timeout: 5000}));
  if (message.member.hasPermission("ADMINISTRATOR")) {
    await resital.voice.setChannel(message.member.voice.channelID);
  } else {
    const reactionFilter = (reaction, user) => {
      return ['✅'].includes(reaction.emoji.name) && user.id === resital.id;
    };
    message.channel.send(`${resital}`, {embed: embed.setAuthor(resital.displayName, resital.user.avatarURL({dynamic: true, size: 2048})).setDescription(`${message.author} Seni çekmek istiyor, kabul ediyor musun?`)}).then(async msj => {
      await msj.react('✅');
      msj.awaitReactions(reactionFilter, {max: 1, time: 15000, error: ['time']}).then(c => {
        let cevap = c.first();
	if (cevap) {
	  resital.voice.setChannel(message.member.voice.channelID);
          msj.delete();
	};
      });
    });
  };
};
module.exports.configuration = {
    name: "çek",
    aliases: ['move', 'taşı'],
    usage: "çek @Resitâl/ID",
    description: "Belirtilen üyeyi ses kanalınıza çekmeyi sağlar."
};
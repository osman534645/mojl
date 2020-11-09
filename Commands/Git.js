const { MessageEmbed } = require("discord.js");

module.exports.execute = async(client, message, args, ayar, emoji) => {
	let resital = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let embed = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp().setColor("RANDOM").setFooter('Resital 🤍 FlowArt');
  if (!resital) return message.channel.send(embed.setDescription("Kimin yanına gideceksin!")).then(x => x.delete({timeout: 5000}));
  if (!message.member.voice.channel || !resital.voice.channel || message.member.voice.channelID == resital.voice.channelID) return message.channel.send(embed.setDescription("Gitmek istediğin kişi seste değil!")).then(x => x.delete({timeout: 5000}));
  if (message.member.hasPermission("ADMINISTRATOR")) {
    await message.member.voice.setChannel(resital.voice.channelID);
  } else {
    const reactionFilter = (reaction, user) => {
      return ['✅'].includes(reaction.emoji.name) && user.id === resital.id;
    };
    message.channel.send(`${resital}`, {embed: embed.setAuthor(resital.displayName, resital.user.avatarURL({dynamic: true, size: 2048})).setDescription(`${message.author} Yanına gelmek istiyor, kabul ediyor musun?`)}).then(async msj => {
      await msj.react('✅');
      msj.awaitReactions(reactionFilter, {max: 1, time: 15000, error: ['time']}).then(c => {
	let cevap = c.first();
	if (cevap) {
	  message.member.voice.setChannel(resital.voice.channelID);
          msj.delete();
	};
      });
    });
  };
};
module.exports.configuration = {
    name: "git",
    aliases: ["go"],
    usage: "git @Resitâl/ID",
    description: "Belirtilen üyenin ses kanalına gitmenizi sağlar."
};
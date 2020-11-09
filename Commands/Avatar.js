const { MessageEmbed } = require("discord.js");

module.exports.execute = (client, message, args, ayar, emoji) => {
	let resital = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
	let avatar = resital.avatarURL({ dynamic: true, size: 2048 });
  let embed = new MessageEmbed()
	.setColor('RANDOM')
  .setAuthor(resital.tag, avatar)
  .setFooter(`${message.member.displayName} tarafından istendi!`, message.author.avatarURL({ dynamic: true }))
	.setImage(avatar)
	message.channel.send(embed);
};
module.exports.configuration = {
    name: "avatar",
    aliases: ["pp"],
    usage: "avatar @Resitâl/ID",
    description: "Belirtilen üyenin avatarını gösterir."
};
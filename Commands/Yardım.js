const { MessageEmbed } = require('discord.js');
const qdb =require("quick.db");
const db = new qdb.table("ayarlar");
const conf = require('../settings.json');

module.exports.execute = async (client, message, args) => {
  
  let embed = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp().setColor("RANDOM").setFooter('Resital 🤍 FlowArt');
  
  let command = args[0]
	if (global.commands.has(command)) {
		command = global.commands.get(command)
		embed
			.addField('Komut Adı', command.configuration.name, false)
			.addField('Komut Açıklaması', command.configuration.description, false)
			.addField('Doğru Kullanım', command.configuration.usage)
			.addField('Alternatifler', command.configuration.aliases[0] ? command.configuration.aliases.join(', ') : 'Bulunmuyor')
			.setTimestamp()
			.setColor('0x36393E')
		message.channel.send(embed)
    return;
	}
  let yazı = "";
  global.commands.forEach(command => {
    yazı += `\`${conf.prefix}${command.configuration.usage}\` \n`;
  });
  message.channel.send(embed.setDescription(yazı));
};

module.exports.configuration = {
  name: "yardım",
  aliases: ['help'],
  usage: "yardım",
  description: "Botta bulunan tüm komutları listeler."
};
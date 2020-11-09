const Discord = require('discord.js');
const ayar = require("../settings.json");
module.exports = (message) => {

    if (message.content.toLowerCase() == "tag" || message.content.toLowerCase() === "!tag") {
        message.channel.send(`${ayar.tag}`)
    };
  
      if (message.content.toLowerCase() == "link" || message.content.toLowerCase() === "!link") {
        message.channel.send(`${ayar.link}`)
    };

    if (message.content.toLowerCase() == "sa" || message.content.toLowerCase() === "sea" || message.content.toLowerCase() === "selam") {
        message.reply("Aleyküm selam kanka hoşgeldin!")
    };

};

module.exports.configuration = {
    name: "message"
  }

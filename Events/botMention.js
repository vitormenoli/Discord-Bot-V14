require('../index')

const Discord = require('discord.js')
const client = require('../index')

client.on("messageCreate", (message) => {
    if (message.author.bot) return;
  
    let mencoes = [`<@${client.user.id}>`, `<@!${client.user.id}>`]
  
    mencoes.forEach(element => {
      if (message.content === element) {
  
        //(message.content.includes(element))
  
        let embed = new Discord.EmbedBuilder()
        .setColor("Random")
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynaimc: true }) })
        .setDescription(`🛠 Olá ${message.author}, utilize \`/help\` para ver meus comandos!`)
        
        message.reply({ embeds: [embed] })
      }
    })
  
})
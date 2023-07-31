const Discord = require("discord.js")
const { QuickDB } = require('quick.db')
const db = new QuickDB()

module.exports = {
  name: 'mensagens', // Coloque o nome do comando
  description: 'Contador de mensagens.', // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: 'usuário',
        description: 'Veja a quantidade de mensagens deste usuário.',
        type: Discord.ApplicationCommandOptionType.User,
        required: false,
    }
],

  run: async (client, interaction) => {

    let user = interaction.options.getUser('usuário')
    if (!user) user = interaction.user

    let member = interaction.guild.members.cache.get(user.id)

    if (!member) {
        const embed = new Discord.EmbedBuilder()
        .setColor('Red')
        .setDescription(`O usuário mencionado não está no servidor!`)

        interaction.reply({ embeds: [embed] })
    } else {
        let messageCounter = await db.get(`messageCounter_${member.user.id}`)
        if (!messageCounter) messageCounter = 0

        const embed = new Discord.EmbedBuilder()
        .setColor('Yellow')
        .setAuthor({ name: member.user.username, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`O usuário ${member} (${member.user.id}) possui \`${messageCounter}\` mensagens neste servidor.`)

        interaction.reply({ embeds: [embed] })
    }
  }
}
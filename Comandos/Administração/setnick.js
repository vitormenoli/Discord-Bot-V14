const Discord = require("discord.js")

module.exports = {
  name: "setnick", // Coloque o nome do comando
  description: "Configura o nickname do usuário no servidor.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "membro",
        description: "Mencione um membro para alterar o nick.",
        type: Discord.ApplicationCommandOptionType.User,
        required: true,
    },
    {
        name: "nick",
        description: "Escreva o novo nickname do membro.",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageNicknames)) {
        interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
    } else {
        const user = interaction.options.getUser("membro")
        const membro = interaction.guild.members.cache.get(user.id)
        const nick = interaction.options.getString("nick")

        membro.setNickname(`${nick}`).then( () => {
            let embed = new Discord.EmbedBuilder()
            .setColor("Green")
            .setDescription(`O usuário ${user} teve seu nickname alterado para \`${nick}\` com sucesso.`)
            interaction.reply({ embeds: [embed] })
        }).catch(e => {
            let embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription(`O nick digitado possui mais de 32 caracteres.`)
            interaction.reply({ embeds: [embed] })
        })
    }


  }
}
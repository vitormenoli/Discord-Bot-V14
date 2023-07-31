const Discord = require("discord.js")

module.exports = {
  name: "kick", // Coloque o nome do comando
  description: "Expulse um membro do servidor.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "membro",
        description: "Mencione um membro.",
        type: Discord.ApplicationCommandOptionType.User,
        required: true,
    },
    {
        name: "motivo",
        description: "Descreva o motivo da expulsão.",
        type: Discord.ApplicationCommandOptionType.String,
        required: false,
    }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.KickMembers)) {
        interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, epemeral: true })
    } else {
        const user = interaction.options.getUser("membro")
        const membro = interaction.guild.members.cache.get(user.id)

        let motivo = interaction.options.getString("motivo")
        if (!motivo) motivo = "Não informado"

        let embed = new Discord.EmbedBuilder()
        .setColor("Green")
        .setDescription(`O usuário ${membro} foi expulso com sucesso!\n\n> Motivo: \`${motivo}\`.`)

        let embed_erro = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription(`O usuário ${membro} não foi expulso do servidor!\nHouve um erro na hora de executar este comando, por favor tente novamente.`);

        membro.kick(motivo).then( () => {
            interaction.reply({ embeds: [embed] })
        }).catch(e => {
            interaction.reply({ embeds: [embed_erro] })
        })
    }


  }
}
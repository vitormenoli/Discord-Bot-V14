const Discord = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB();

module.exports = {
  name: "antilink", // Coloque o nome do comando
  description: "Ative ou desativee o sistema de antilink no servidor.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
        interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
    } else {
        let embed_g = new Discord.EmbedBuilder()
        .setColor("Green")
        .setDescription(`Olá ${interaction.user}, o sistema de antilink foi \`ativado\`.`);

        let embed_r = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription(`Olá ${interaction.user}, o sistema de antilink foi \`desativado\`.`);

        let confirm = await db.get(`antilink_${interaction.guild.id}`);

        if (confirm === null || confirm === false) {
            interaction.reply({ embeds: [embed_g] })
            await db.set(`antilink_${interaction.guild.id}`, true)
        } else if (confirm === true) {
            interaction.reply({ embeds: [embed_r] })
            await db.set(`antilink_${interaction.guild.id}`, false)
        }
    }

  }
}
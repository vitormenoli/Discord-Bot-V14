const Discord = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()

module.exports = {
  name: "afk", // Coloque o nome do comando
  description: "Ative o modo afk.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "motivo",
        description: "Adicione o motivo da inatividade.",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    }
],

  run: async (client, interaction) => {

    let motivo = interaction.options.getString("motivo");

    let afk_mode = await db.get(`modo_afk_${interaction.user.id}`);

    if (afk_mode === true) {
        interaction.reply({ content: `Olá ${interaction.user}, seu modo AFK já está ativado.`, ephemeral: true })
    } else {
        interaction.reply({ content: `Olá ${interaction.user}, seu modo AFK foi ativado com sucesso!` })
        await db.set(`modo_afk_${interaction.user.id}`, true)
        await db.set(`motivo_afk_${interaction.user.id}`, motivo)
    }
    
  }
}
const Discord = require("discord.js");
const { link } = require("fs");

module.exports = {
  name: "serverinfo", // Coloque o nome do comando
  description: "Envia as informações do atual servidor.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    const nome = interaction.guild.name;
    const id = interaction.guild.id;
    const icon = interaction.guild.iconURL({ dynamic: true });
    const membros = interaction.guild.memberCount;

    const criacao = interaction.guild.createdAt.toLocaleDateString("pt-br");
    
    const canais_total = interaction.guild.channels.cache.size;
    const canais_texto = interaction.guild.channels.cache.filter(c => c.type === Discord.ChannelType.GuildText).size;
    const canais_voz = interaction.guild.channels.cache.filter(c => c.type === Discord.ChannelType.GuildVoice).size;
    const canais_categoria = interaction.guild.channels.cache.filter(c => c.type === Discord.ChannelType.GuildCategory).size;

    const color = "blue";

    const embed1 = new Discord.EmbedBuilder()
    .setColor(color)
    .setAuthor({ name: nome, iconURL: icon })
    .setThumbnail(icon)
    .addFields(
        {
            name: `💻 Nome:`,
            value: `\`${nome}\``,
            inline: true
        },
        {
            name: `🆔 ID:`,
            value: `\`${id}\``,
            inline: true
        },
        {
            name: `👥 Membros:`,
            value: `\`${membros}\``,
            inline: true
        },
        {
            name: `📅 Criação:`,
            value: `\`${criacao}\``,
            inline: true
        },
        {
            name: `📤 Canais Totais:`,
            value: `\`${canais_total}\``,
            inline: true
        },
        {
            name: `📝 Canais de Texto:`,
            value: `\`${canais_texto}\``,
            inline: false
        },
        {
            name: `🔊 Canais de Voz:`,
            value: `\`${canais_voz}\``,
            inline: false
        },
        {
            name: `📅 Categorias:`,
            value: `\`${canais_categoria}\``,
            inline: false
        }
        
    );

    const botao = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
        .setURL(icon)
        .setLabel("Ícone do servidor")
        .setStyle(Discord.ButtonStyle.Link)
    )

    interaction.reply({ embeds: [embed1], components: [botao] })
  }
}
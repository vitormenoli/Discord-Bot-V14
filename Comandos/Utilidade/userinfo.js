const Discord = require("discord.js")

module.exports = {
  name: "userinfo", // Coloque o nome do comando
  description: "Veja informações de um usuário.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "usuário",
        description: "Mencione um usuário.",
        type: Discord.ApplicationCommandOptionType.User,
        required: true,
    }
],

  run: async (client, interaction) => {

    let user = interaction.options.getUser("usuário");
    let data_conta = user.createdAt.toLocaleString();
    let id = user.id;
    let tag = user.tag;
    let is_bot = user.bot;

    if (is_bot === true) is_bot = "Sim";
    if (is_bot === false) is_bot = "Não";

    let embed = new Discord.EmbedBuilder()
    .setColor("Random")
    .setAuthor({ name: user.username, iconURL: user.displayAvatarURL({ dynamic: true }) })
    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
    .setTitle("Informações do Usuário:")
    .addFields(
        {
            name: `🎇 Tag:`,
            value: `\`${tag}\`.`,
            inline: false
        },
        {
            name: `🆔 Id:`,
            value: `\`${id}\`.`,
            inline: false
        },
        {
            name: `📅 Criação da conta:`,
            value: `\`${data_conta}\`.`,
            inline: false
        },
        {
            name: `🤖 É um bot?`,
            value: `\`${is_bot}\`.`,
            inline: false
        }
    );

    let botao = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
        .setURL(user.displayAvatarURL({ dynamic: true }))
        .setEmoji("📎")
        .setStyle(Discord.ButtonStyle.Link)
        .setLabel(`Avatar de ${user.username}.`)
        
    )

    interaction.reply({ embeds: [embed], components: [botao] })


    
  }
}
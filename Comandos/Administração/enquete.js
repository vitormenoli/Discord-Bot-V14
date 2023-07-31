const Discord = require("discord.js")
const ms = require('ms')

module.exports = {
  name: 'enquete', // Coloque o nome do comando
  description: 'Crie uma enquete no servidor.', // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: 'tempo',
        description: 'Coloque um tempo em s/m/d.',
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    },
    {
        name: 'título',
        description: 'Qual será o título da enquete.',
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    },
    {
        name: 'opção1',
        description: 'Adicione a opção 1 de votação.',
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    },
    {
        name: 'opção2',
        description: 'Adicione a opção 2 de votação.',
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
        interaction.reply({ ephemeral: true, content: 'Você não possui permissão para utilizar este comando.' })
    } else {
        const tempo = interaction.options.getString('tempo')
        const titulo = interaction.options.getString('título')
        const op1 = interaction.options.getString('opção1')
        const op2 = interaction.options.getString('opção2')

        let tempoms = ms(tempo)
        if (isNaN(tempoms)) return interaction.reply({ ephemeral: true, content: 'A opção tempo está inválida: \`' + tempo + '\`.' })

        const emojis = ['1️⃣', '2️⃣']

        const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setColor('Yellow')
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setTitle('Nova enquete: ' + titulo)
        .setDescription(`Nova enquete criada por ${interaction.user} (${interaction.user.id}).\n\n>  ${emojis[0]} ${op1}\n> ${emojis[1]} ${op2}`)
        .setTimestamp(new Date(new Date().getTime() + tempoms))
        .setFooter({ text: `Final da enquete:`})

        interaction.reply({ ephemeral: true, content: 'Enquete Criada!' }).then( () => {
            interaction.channel.send({ embeds: [embed] }).then( (msgg) => {
                emojis.forEach(emoji => {
                    msgg.react(emoji)
                })

                setTimeout( async() => {

                    const msg = await interaction.channel.messages.fetch(msgg.id);

                    let emojiOpc1 = msg.reactions.cache.get(emojis[0])?.count || 0;
                    let emojiOpc2 = msg.reactions.cache.get(emojis[1])?.count || 0;
                    // if (msg.reactions.cache.get(emojis[0])?.me) {
                    //   emojiOpc1--
                    // }
                    // if (msg.reactions.cache.get(emojis[1])?.me) {
                    //   emojiOpc2--
                    // }

                    let win
                    if (emojiOpc1 > emojiOpc2) win = op1 + ` (Total de reações: \`${emojiOpc1}\`)`
                    if (emojiOpc2 > emojiOpc1) win = op2 + ` (Total de reações: \`${emojiOpc2}\`)`
                    if (emojiOpc1 === emojiOpc2) win = `As duas opções foram votadas igualmente (Total de reações: \`${emojiOpc1}\`).`

                    const embedOff = new Discord.EmbedBuilder()
                    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                    .setColor(null)
                    .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                    .setTitle('Enquete Encerrada: ' + titulo)
                    .setDescription(`Nova enquete criada por ${interaction.user} (${interaction.user.id}).\n\n>  ${emojis[0]} ${op1}\n> ${emojis[1]} ${op2}`)
                    .setTimestamp(new Date(new Date().getTime() + tempoms))
                    .setFooter({ text: `Enquete encerrada às:`})

                    msg.reply({ content: `**Enquete Encerrada**\n\n> __Opção mais votada:__ ${win}` })
                    msg.edit({ embeds: [embedOff] })
                }, tempoms)
            })
        })
    }
  }
}
const Discord = require("discord.js")

module.exports = {
  name: 'cores', // Coloque o nome do comando
  description: 'Abra o painel de selecionar as cores do nick.', // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
        interaction.reply({ ephemeral: true, content: 'Você não possui permissão para utilizar este comando.'})
    } else {
        const cores = { // Coloque o ID do cargo em cada variável
            // Coloque o nome dos cargos com a inicial 'Cor'
            // Exemplo: Cor Azul, Cor Vermelho
            azul: interaction.guild.roles.cache.get('1108956743020597298'),
            vermelho: interaction.guild.roles.cache.get('1108956974646837339'),
            laranja: interaction.guild.roles.cache.get('1108956976127426652'),
            amarelo: interaction.guild.roles.cache.get('1108956977494753333'),
            verde: interaction.guild.roles.cache.get('1108956979260575884'),
            rosa: interaction.guild.roles.cache.get('1108956980799868948'),
            roxo: interaction.guild.roles.cache.get('1108956982498574366'),
            preto: interaction.guild.roles.cache.get('1108956984121774080'),
            branco: interaction.guild.roles.cache.get('1108956985220669513')
        }

        const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setColor('White')
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setDescription(`> **Olá membros, reaja a mensagem abaixo __de acordo com a cor que você deseja__ para o *seu nick*!**\n
🔵 Azul - [${cores.azul}]
🔴 Vermelho - [${cores.vermelho}]
🟠 Laranja - [${cores.laranja}]
🟡 Amarelo - [${cores.amarelo}]
🟢 Verde - [${cores.verde}]
🌹 Rosa - [${cores.rosa}]
🟣 Roxo - [${cores.roxo}]
⚫ Preto - [${cores.preto}]
⚪ Branco - [${cores.branco}]
`)

        interaction.reply({ ephemeral: true, content: 'Mensagem enviada abaixo:' }).then( () => {
            interaction.channel.send({ embeds: [embed] }).then(message => {
                const emojis = ['🔵', '🔴', '🟠', '🟡', '🟢', '🌹', '🟣', '⚫', '⚪']
                emojis.forEach(emoji => {
                    message.react(emoji)
                })
            })
        })
    }


    
  }
}
const Discord = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()

module.exports =  {
    name: "carteira",
    description: "Veja a quantidade de moedas em sua carteira.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "usuário",
            type: Discord.ApplicationCommandOptionType.User,
            description: "Veja a carteira de um usuário.",
            required: false 
        }
    ],
    
    run: async (client, interaction, args) => {

        let user = interaction.options.getUser("usuário");
        if (!user) user = interaction.user;

        let carteira = await db.get(`carteira_${user.id}`)
        if (carteira === null) carteira = 0;

        if (user.id === interaction.user.id) { // Caso não seja mencionado ninguém
            let embed = new Discord.EmbedBuilder()
            .setColor("Yellow")
            .setTitle("💸 Carteira")
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setDescription(`Você possui \`${carteira} moedas\` em sua carteira.`);

            interaction.reply({ embeds: [embed] })
        } else { // Caso seja mencionado alguém
            let embed = new Discord.EmbedBuilder()
            .setColor("Yellow")
            .setTitle("💸 Carteira")
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setDescription(`O usuário ${user} (${user.id}) possui \`${carteira} moedas\` em sua carteira.`);

            interaction.reply({ embeds: [embed] })
        }
        
    }
}
require('../index')

const Discord = require('discord.js')
const client = require('../index')
const { QuickDB } = require('quick.db')
const db = new QuickDB()

client.on('messageCreate', async(message) => {
    if (message.author.bot) return;
    if (message.channel.id !== '1102777589707317338') return;
    let numberCount = await db.get(`numberCount_${message.channel.id}`)
    if (!numberCount) numberCount = 0

    if (isNaN(message.content)) return message.reply({ content: 'Isso não é um número' }).then(msg => {
        setTimeout( () => {
            msg.delete()
            message.delete()
        }, 5000)
    })

    if (Number(message.content) !== numberCount + 1) return message.reply({ content: `O número correto é \`${numberCount + 1}\`.` }).then(msg => {
        setTimeout( () => {
            msg.delete()
            message.delete()
        }, 5000)
    })

    await db.set(`numberCount_${message.channel.id}`, Number(message.content))
    message.react('✅')
})
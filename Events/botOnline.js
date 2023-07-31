require('../index')

const Discord = require('discord.js')
const client = require('../index')


client.on('ready', () => {
    console.log(`🔥 Estou online em ${client.user.username}!`)
})
  
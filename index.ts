import DiscordJS, { Channel, Guild, Intents, Interaction } from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config();

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_PRESENCES,
    ]
})

client.on('ready', async () => {
    new WOKCommands(client, {
        commandDir: path.join(__dirname, 'commands'),
        featureDir: path.join(__dirname, 'features'),
        
        typeScript: true,
        testServers: ['953970921981489173'],
        botOwners: ['837661782151659560', '433645584696475653'],
        mongoUri: process.env.MONGO_URI,
    })

    console.log('the bot is ready')
})

client.on('messageCreate', (message) => {
    if (message.content === 'hello'){
        message.reply({
            content: 'HI',
        })
    }
    
})


client.login(process.env.DJS_TOKEN)

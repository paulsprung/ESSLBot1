import DJS from 'discord.js'
import { ICommand } from "wokcommands";
import guildinfoSchema from '../../models/guildinfo-Schema';

export default {
    category: 'Configuration',
    description: 'Set the temp channel!',
    
    permissions: ['ADMINISTRATOR'],

    minArgs: 2,
    expectedArgs: '<channel> <category>',

    slash: true,
    testOnly: false,

    options: [
        {
            name: 'channel',
            description: 'Join channel.',
            required: true,
            type: DJS.Constants.ApplicationCommandOptionTypes.CHANNEL
        },
        {
            name:'category',
            description: 'Category you want your Temp Channels in',
            required: true,
            type: DJS.Constants.ApplicationCommandOptionTypes.CHANNEL
        }
    ],

    callback: async ({ guild, message, interaction, args}) => {
        if(!guild){
            return 'Please use this command within a server'
        }
        
        const target = interaction.options.getChannel('channel')
        if(!target || target.type !== 'GUILD_VOICE'){
            return 'Please tag a voice channel.'
        }
        
        const category = interaction?.options.getChannel('category')
        if(!category || category.type !== 'GUILD_CATEGORY'){
            return 'Please tag a category channel.'
        }

        await guildinfoSchema.findOneAndUpdate({
            _id: guild.id
        },{
            _id: guild.id,
            serverName: guild.name,
            tempchannelId: target.id,
            tempcategoryId: category.id,
        },{
            upsert: true
        })

        
        return 'Temp Channel gesetzt';
        
    }
} as ICommand

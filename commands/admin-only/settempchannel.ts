import DJS from 'discord.js'
import { ICommand } from "wokcommands";
import tempchannelSchema from '../../models/tempchannel-schema';

export default {
    category: 'Configuration',
    description: 'Set the temp channel!',
    
    permissions: ['ADMINISTRATOR'],

    minArgs: 2,
    expectedArgs: '<channel> <category>',

    slash: true,
    testOnly: true,

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

        await tempchannelSchema.findOneAndUpdate({
            _id: guild.id

        },{
            _id: guild.id,
            categoryId: category.id,
            channelId: target.id
        },{
            upsert: true
        })
        return 'Temp Channel gesetzt';
        
    }
} as ICommand

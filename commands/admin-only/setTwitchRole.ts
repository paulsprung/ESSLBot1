import DJS, { Role } from 'discord.js'
import { ICommand } from "wokcommands";
import guildinfoSchema from '../../models/guildinfo-Schema';

export default {
    category: 'Configuration',
    description: 'Set the Twitch Roles',
    
    permissions: ['ADMINISTRATOR'],

    minArgs: 2,
    expectedArgs: '<role> <role>',

    slash: true,
    testOnly: false,

    options: [
        {
            name: 'trole',
            description: 'The Twitch Role',
            required: true,
            type: DJS.Constants.ApplicationCommandOptionTypes.ROLE
        },
        {
            name: 'lrole',
            description: 'The Live Role',
            required: true,
            type: DJS.Constants.ApplicationCommandOptionTypes.ROLE
        }
    ],

    callback: async ({ guild, message, interaction, args}) => {
        if(!guild){
            return 'Please use this command within a server'
        }
        
        const trole = interaction.options.getRole('trole')
        if(!trole){
            return 'please tag a Twitch Role.'
        }            

        let lrole = interaction?.options.getRole('lrole')
        if(!lrole){
            return 'please tag a Live Role.'
        }

        await guildinfoSchema.findOneAndUpdate({
            _id: guild.id

        },{
            _id: guild.id,
            twitchroleId: trole.id,
            liveroleId: lrole.id
        },{
            upsert: true
        })
        return 'Twitch Role gesetzt!';
        
    }
} as ICommand

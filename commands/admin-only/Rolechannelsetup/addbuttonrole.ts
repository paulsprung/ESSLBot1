import DJS, { MessageActionRow, MessageButton } from 'discord.js'
import { MessageEmbed, TextChannel } from 'discord.js';
import { ICommand } from "wokcommands";
//import betaaccessSchema from '../../../models/betaaccessSchema';

export default {
    category: 'Configuration',
    description: 'add role button',
    
    permissions: ['ADMINISTRATOR'],

    minArgs: 1,
    expectedArgs: '<channel> <role>',

    slash: true,
    testOnly: true,

    options: [
        {
            name: 'channel',
            description: 'Verify channel.',
            required: true,
            type: DJS.Constants.ApplicationCommandOptionTypes.CHANNEL
        },{
            name: 'role',
            description: 'Which role the user gets',
            required: true,
            type: DJS.Constants.ApplicationCommandOptionTypes.ROLE
        }
    ],

    callback: async ({ guild, message, interaction, args}) => {
        if(!guild){
            return 'Please use this command within a server'
        }
        const target = interaction.options.getChannel('channel')
        if(!target || target.type !== 'GUILD_TEXT'){
            return 'Please tag a text channel.'
        }
        const give = interaction.options.getRole('role')
        if(!give){
            return 'Please enter a role.'
        }

        //embeded und buttons 
        const embed = new MessageEmbed()
            .setColor('#e3000b')
            .setTitle('Test X')
            .setDescription('no')
            .setTimestamp()
            .setFooter({ text: 'ESSL Bot', iconURL: 'https://imgur.com/Eo323Sd.jpg' });
    
        const ruleembed = new MessageEmbed()
            .setColor('#e3000b')
            .setTitle('Test')
            .setDescription('igh')
            .setTimestamp()
            .setFooter({ text: 'ESSL Bot', iconURL: 'https://imgur.com/Eo323Sd.jpg' });
        
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('betaacces')
                    .setEmoji('✔️')
                    .setLabel('get Access')
                    .setStyle('SUCCESS')
            )

        target.send({
            embeds : [embed],
            components: [row]
        })

        /*await betaaccessSchema.findOneAndUpdate({
            _id: guild.id

        },{
            _id: guild.id,
            roleId: give.id,
            channelId: target.id
        },{
            upsert: true
        })
        return 'betaaccess channel set';
    */    
    }
} as ICommand

import DJS, { MessageActionRow, MessageButton } from 'discord.js'
import { MessageEmbed } from 'discord.js';
import { ICommand } from "wokcommands";
import guildinfoSchema from '../../../models/guildinfo-Schema';

export default {
    category: 'Configuration',
    description: 'Set the temp verify!',
    
    permissions: ['ADMINISTRATOR'],

    minArgs: 1,
    expectedArgs: '<channel> <role>',

    slash: true,
    testOnly: false,

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

    callback: async ({ guild, interaction }) => {
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
            .setTitle('Accept the rules')
            .setDescription('To accept the rules click on the button below!')
            .setThumbnail('https://i.imgur.com/L8DSPNg.png')
            .setTimestamp()
            .setFooter({ text: 'ESSL Bot', iconURL: 'https://imgur.com/Eo323Sd.jpg' });
        
        const row = new MessageActionRow() 
            .addComponents(
                new MessageButton()
                    .setCustomId('verify')
                    .setEmoji('✔️')
                    .setLabel('verify')
                    .setStyle('SUCCESS')
            )
            
        target.send({
            embeds : [embed],
            components: [row]
        })


        await guildinfoSchema.findOneAndUpdate({
            _id: guild.id
        },{
            _id: guild.id,
            serverName: guild.name,
            
            joinroleId: give.id,
            joinchannelId: target.id
        },{
            upsert: true
        })
        return 'Verify Channel gesetzt';
        
    }
} as ICommand

import DJS, { MessageActionRow, MessageSelectMenu, MessageEmbed } from 'discord.js'
import { ICommand } from "wokcommands";
import guildinfoSchema from '../../models/guildinfo-Schema';


export default {
    category: 'Configuration',
    description: 'sets beta button',
    
    permissions: ['ADMINISTRATOR'],

    minArgs: 1,
    expectedArgs: '<channel> <category> <role>',

    slash: true,
    testOnly: false,

    options: [
        {
            name: 'channel',
            description: 'Your support Channel',
            required: true,
            type: DJS.Constants.ApplicationCommandOptionTypes.CHANNEL
        },{
            name: 'category',
            description: 'Your support category',
            required: true,
            type: DJS.Constants.ApplicationCommandOptionTypes.CHANNEL
        },{
            name: 'role',
            description: 'Support Role',
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
        const category = interaction.options.getChannel('category')
        if(!category || category.type !== 'GUILD_CATEGORY'){
            return 'Please enter a category.'
        }
        const role = interaction.options.getRole('role')
        if(!role){
            return 'Please enter a Support Role.'
        }

        //embeded und dropdown menu 
        const embed = new MessageEmbed()
            .setColor('#e3000b')
            .setTitle('Support Ticket')
            .setDescription('Choose the type off help you would need!')
            .setTimestamp()
            .setFooter({ text: 'ESSL Bot', iconURL: 'https://imgur.com/Eo323Sd.jpg' });
        
        const row = new MessageActionRow() 
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('SupportMenu')
                    .setPlaceholder('Nothing selected')
                    .addOptions([
                        {
                            label: 'Support',
                            description: 'A normal Support ticket if something isn`t working',
                            emoji: '✉️',
                            value: 'Support',
                            default: true
                        },
                        {
                            label: 'Report',
                            description: 'To report a user in the discord',
                            emoji: '⚠️',
                            value: 'Report',
                        }, 
                        {
                            label: 'Tournament',
                            description: 'Only for Player, to inform report etc',
                            emoji: '🏆',
                            value: 'Tournament',
                        },
                        {
                            label: 'Application',
                            description: 'If you want to apply for the ESSL Team',
                            emoji: '💬',
                            value: 'Application',
                        },
                        {
                            label: 'Bot',
                            description: 'Whenever you find a bug in the bots-system',
                            emoji: '🤖',
                            value: 'Bot',
                        }

                    ])
                    .setMaxValues(1)

            )

        target.send({
            embeds : [embed],
            components: [row]
        })

        await guildinfoSchema.findOneAndUpdate({
            _id: guild.id

        },{
            _id: guild.id,
            supportcategoryId: category.id,
            supportchannelId: target.id,
            supportroleId: role.id,
        },{
            upsert: true
        })
        return 'support channel set';
        
    }
} as ICommand

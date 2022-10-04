import DJS, { Message, MessageEmbed, MessageEmbedVideo, TextChannel } from 'discord.js';
import { ICommand } from "wokcommands";
import guildinfoSchema from '../../../models/guildinfo-Schema';

export default {
    category: 'Configuration',
    description: 'sends Autorole Messages',
    
    permissions: ['ADMINISTRATOR'],

    minArgs: 1,
    expectedArgs: '<channel>',

    slash: true,
    testOnly: false,

    options: [
        {
            name: 'channel',
            description: 'Autorole Channel',
            required: true,
            type: DJS.Constants.ApplicationCommandOptionTypes.CHANNEL
        }
    ],

    callback: async ({ guild, interaction}) => {
        if(!guild){
            return 'Please use this command within a server'
        }
        const target = interaction.options.getChannel('channel')
        if(!target || target.type !== 'GUILD_TEXT'){
            return 'Please tag a text channel.'
        }

        //embeded und buttons 
        const schoolembed = new MessageEmbed()
            .setColor('#e3000b')
            .setTitle('**School**')
            .setDescription('Get your school role here!')
            .setTimestamp()
            .setFooter({ text: 'ESSL Bot', iconURL: 'https://imgur.com/Eo323Sd.jpg' });
    
        const gameembed = new MessageEmbed()
            .setColor('#e3000b')
            .setTitle('**Games**')
            .setDescription('Get your Gamerole here!')
            .setTimestamp()
            .setFooter({ text: 'ESSL Bot', iconURL: 'https://imgur.com/Eo323Sd.jpg' });
        
        const newsembed = new MessageEmbed()
            .setColor('#e3000b')
            .setTitle('**News**')
            .setDescription('Click to get specified news!')
            .setTimestamp()
            .setFooter({ text: 'ESSL Bot', iconURL: 'https://imgur.com/Eo323Sd.jpg' });

        const feedback = new MessageEmbed()
            .setColor('#e3000b')
            .setTitle('**Setup**')
            .setDescription('Autorolechannel set!')
            .addFields(
                
                { name: 'add Autoroles', value: '/addbuttonrole'},
                { name: 'add the valorant Autorole', value: '/setvaloautorole', inline: true },
                { name: 'add the RocketLeague Autorole', value: 'need to work on it', inline: true },
            )
            .setTimestamp()
            .setFooter({ text: 'ESSL Bot', iconURL: 'https://imgur.com/Eo323Sd.jpg' });
        
        await target.send({
            files: ["https://i.imgur.com/Ldrkg4n.jpg"],
        })
        await target.send({
            embeds: [schoolembed],
        })

        await target.send({
            embeds: [gameembed],
        })

        await target.send({
            embeds: [newsembed],
        })

        await guildinfoSchema.findOneAndUpdate({
            _id: guild.id
        },{
            _id: guild.id,
            serverName: guild.name,
            autorolechannelId: target.id,
        },{
            upsert: true
        })

        return 'autorolechannelset'   
    }
} as ICommand

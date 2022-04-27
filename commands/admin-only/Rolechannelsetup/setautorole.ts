import DJS, { Message, MessageActionRow, MessageButton } from 'discord.js'
import { MessageEmbed } from 'discord.js';
import { InviteTargetType } from 'discord.js/typings/enums';
import { ICommand } from "wokcommands";
//import betaaccessSchema from '../../../models/betaaccessSchema';

export default {
    category: 'Configuration',
    description: 'sends Autorole Messages',
    
    permissions: ['ADMINISTRATOR'],

    minArgs: 1,
    expectedArgs: '<channel>',

    slash: true,
    testOnly: true,

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
        
        let msgId = ''
        target.messages.fetch()
            .then(messages => {
                messages.forEach(message => {
                    msgId = `${msgId} ${message.id}`
                    console.log(message.id)
                })
            })
        
        console.log(msgId)
        /*
        target.messages.fetch({ limit: 100 }).then(messages => {
            console.log(`Received ${messages.size} messages`);
            messages.forEach(message => {
                console.log(message.content)
            })

        })*/

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

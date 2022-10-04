import DJS, { MessageEmbed, Guild } from 'discord.js';
import { ICommand } from "wokcommands";
import guildinfoSchema from '../../../models/guildinfo-Schema';

export default {
    category: 'Configuration',
    description: 'sends Rule Message',
    
    permissions: ['ADMINISTRATOR'],

    minArgs: 1,
    expectedArgs: '<channel>',

    slash: true,
    testOnly: false,

    options: [
        {
            name: 'channel',
            description: 'Rule Channel',
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

        //embeded und and Pictures 

        const ruleembeded = new MessageEmbed()
            .setColor('#e3000b')
            .setDescription('Wichtige Regeln die zu befolgen sind!')
            .addField(
                'Allgemeine Verhaltensregeln auf dem Discord', '\u200B'
            )
            .addFields(
                { name: '**1. Behandelt alle mit Respekt.**', value: 'Persönliche Attacken, Schimpfwörter etc. werden mit Mutes / kicks gehandelt.' },
                { name: '**2. Die Channels anhand ihrer Channel Beschreibung nutzen.**', value: 'Mehrfaches missachten dieser Beschreibung führt zu Mutes.' },
                { name: '**3. Absolut kein NSFW.**', value: 'Wir müssen uns an die Jugendschutzgesetze halten. Missachten dieses wird mit Kicks bestraft.', },
                { name: '**4. Keine Werbung.**', value: '\u200B', },
                { name: '**5. Kein Spamming.**', value: '\u200B \u200B', },
                { name: '**6. Gib dich nicht als Person aus die du nicht bist.**', value: '\u200B', },
                { name: '***Anmerkung***', value: '• Diese Regeln sind nicht allumfassend. Nur weil es nicht hier steht, heißt es nicht das es erlaubt ist. \n • Benutze deinen Verstand und folgen den Anweisungen des Morderations Teams. \n • Um einen User zu Reporten, Feedback zu geben oder anderweitiges, sende bitte eine DM an \n • Discord Terms of Service sind jederzeit einzuhalten.', },


            )
            .setTimestamp()
            .setFooter({ text: 'ESSL Bot', iconURL: 'https://imgur.com/Eo323Sd.jpg' });
    

        await target.send({
            files: ["https://i.imgur.com/YfW4K8P.png"],
        })
        await target.send({
            embeds: [ruleembeded],
        })

        await guildinfoSchema.findOneAndUpdate({
            _id: guild.id
        },{
            _id: guild.id,
            serverName: guild.name,
            rulechannelId: target.id,
        },{
            upsert: true
        })
        return 'rulechannelset';   
    }

} as ICommand

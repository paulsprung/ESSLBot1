import DJS from 'discord.js'
import { VoiceChannel, CategoryChannel, GuildMember } from 'discord.js';
import { ICommand } from "wokcommands";
import channelInfoSchema from '../../models/channelInfoSchema';

const channelInfoData = {} as {
    // guildID: [channel, category]
    [key: string]: [VoiceChannel, CategoryChannel, GuildMember]
}

export default {
    category: 'tempchannel settings',
    description: 'set Name for the channel.',
    

    minArgs: 1,
    expectedArgs: '<text>',

    slash: true,
    testOnly: true,
    ephemeral: true,

    options: [
        {
            name: 'text',
            description: 'The channel name',
            required: true,
            type: DJS.Constants.ApplicationCommandOptionTypes.STRING
        }
    ],

    callback: async ({ guild, message, interaction, args}) => {
        if(!guild){
            return {
                content: 'Please use this command within a server',
                ephemeral: true,
                custom: true
              }
        }
        const member = guild.members.cache.get(interaction.user.id)
        
        if(!member?.voice.channel){
            return 'you must be connected to a voicechannel'
        }
        if(member.voice.channel){
            let data = channelInfoData[member.voice.channel.id]

            if(!data){
                const results = await channelInfoSchema.findById(member.voice.channel.id)
                if(!results){
                    return
                }
                const {channelId, categoryId, ownerId } = results
                const category = guild.channels.cache.get(categoryId) as CategoryChannel
                const owner = guild.members.cache.get(ownerId) as GuildMember
                const channel = guild.channels.cache.get(channelId) as VoiceChannel

                data = channelInfoData[member.voice.channel.id] = [channel, category, owner]
            }
            if(member === data[2]){
                let text = interaction?.options.getString('text')
                member.voice.channel.setName(text!)
                return {
                    content: 'Name gesetzt',
                    ephemeral: true,
                    custom: true
                }
            }
        }
        return {
            content: 'You must be in a Voicechannel and the creator off it!',
            ephemeral: true,
            custom: true
        };    
    }
} as ICommand

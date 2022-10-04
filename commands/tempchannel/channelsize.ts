import DJS from 'discord.js'
import { VoiceChannel, CategoryChannel, GuildMember } from 'discord.js';
import { ICommand } from "wokcommands";
import channelInfoSchema from '../../models/tempchannelmodels/channelInfoSchema';

const channelInfoData = {} as {
    // guildID: [channel, category]
    [key: string]: [VoiceChannel, CategoryChannel, GuildMember]
}

export default {
    category: 'tempchannel settings',
    description: 'set Sizefor the channel',
    

    minArgs: 1,
    expectedArgs: '<number>',

    slash: true,
    testOnly: false,
    ephemeral: true,

    options: [
        {
            name: 'number',
            description: 'The channel size',
            required: true,
            type: DJS.Constants.ApplicationCommandOptionTypes.INTEGER
        }
    ],

    callback: async ({ guild, message, interaction, args}) => {
        if(!guild){
            return 'Please use this command within a server'
        }
        const member = guild.members.cache.get(interaction.user.id)
        
        if(!member?.voice.channel){
            return {
                content: 'Please use this command within a server',
                ephemeral: true,
                custom: true
              }
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
                let number = interaction?.options.getInteger('number')
                if(number! >= 100 || number! <= 0) {
                    number = 0
                }
                data[0].setUserLimit(number!)
                return {
                    content: 'Size gesetzt',
                    ephemeral: true,
                    custom: true
                }
            }
        }
        return {
            content: 'You must be in a Voicechannel and the creator off it!',
            ephemeral: true,
            custom: true
        }   
    }
} as ICommand

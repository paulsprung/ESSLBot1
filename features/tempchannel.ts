import { Client, VoiceChannel, CategoryChannel, } from "discord.js";
import tempchannelSchema from "../models/tempchannel-schema";
import channelInfoSchema from "../models/channelInfoSchema";


const tempchannelData = {} as {
    // guildID: [channel, category]
    [key: string]: [VoiceChannel, CategoryChannel]
}
 

export default (client: Client) => {
    client.on('voiceStateUpdate', async (oldState, newState) => {
        const { guild, id } = oldState
        let data = tempchannelData[guild.id]
        
        if(!data){
            const results = await tempchannelSchema.findById(guild.id)
            if(!results){
                return
            }
            const { channelId, categoryId } = results
            const channel = guild.channels.cache.get(channelId) as VoiceChannel
            const category = guild.channels.cache.get(categoryId) as CategoryChannel
            
            data = tempchannelData[guild.id] = [channel, category]
        }
        
        const user = await client.users.fetch(newState.id)
        const member = newState.member!


        if(!oldState.channel && newState.channel === data[0]) {
            const joinchannel = await guild.channels.create(`➤${user.username}'s Channel`, {
                type: 'GUILD_VOICE',
                parent: data[1],
            })
            member.voice.setChannel(joinchannel)
            await new channelInfoSchema({
                _id: joinchannel.id,
                channelId: joinchannel.id,
                categoryId: data[1].id,
                ownerId: user.id,
            }).save()
        } 
    })
}

export const config = {
    displayName: 'Temp Channel',
    dbName: 'TEMP_CHANNEL'
}
import { Client, VoiceChannel, CategoryChannel, } from "discord.js";
import channelInfoSchema from "../../models/tempchannelmodels/channelInfoSchema";
import guildinfoSchema from "../../models/guildinfo-Schema";


const tempchannelData = {} as {
    // guildID: [channel, category]
    [key: string]: [VoiceChannel, CategoryChannel]
}
 

export default (client: Client) => {
    client.on('voiceStateUpdate', async (oldState, newState) => {
        const { guild, id } = oldState
        let data = tempchannelData[guild.id]
        if(!data){
            const results = await guildinfoSchema.findById(guild.id)
            if(!results){
                return
            }
            const { tempchannelId, tempcategoryId } = results
            const channel = guild.channels.cache.get(tempchannelId) as VoiceChannel
            const category = guild.channels.cache.get(tempcategoryId) as CategoryChannel
            
            data = tempchannelData[guild.id] = [channel, category]
        }
        
        const user = await client.users.fetch(newState.id)
        const member = newState.member!


        if(newState.channel === data[0]) {
            const joinchannel = await guild.channels.create(`➤${user.username}'s Channel`, {
                type: 'GUILD_VOICE',
                permissionOverwrites: [
                    {
                        id: user.id, //To make it be seen by a certain role, user an ID instead
                        allow: ['MANAGE_CHANNELS'],
                    },
                    {
                        id: guild.roles.everyone,
                        allow: ['SPEAK', 'CONNECT', 'REQUEST_TO_SPEAK', 'STREAM'],
                    }
                 ],
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
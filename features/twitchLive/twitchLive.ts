import { Client, Role, ActivityType } from "discord.js";
import guildinfoSchema from "../../models/guildinfo-Schema";


const twitchroleData = {} as {
    // guildID: [channel, category]
    [key: string]: [Role, Role]
}
 

export default (client: Client) => {
    client.on('presenceUpdate', async (oldMember, newMember) => {
        const { guild, member } = newMember
        if(!guild){
            return
        }

        let data = twitchroleData[guild.id]
        if(!data){
            const results = await guildinfoSchema.findById(guild.id)
            if(!results){
                return
            }
            const { twitchroleId, liveroleId} = results
            const trole = guild.roles.cache.get(twitchroleId) as Role
            const lrole = guild.roles.cache.get(liveroleId) as Role
            data = twitchroleData[guild.id] = [trole, lrole]
        }
        const status = newMember.activities.filter((activity) => {
            return activity.type
        })
        for (const id of status){
            if(member!.roles.cache.has(data[0].id) && id.type === 'STREAMING'){
                member?.roles.add(data[1].id)
            }
            else if(member!.roles.cache.has(data[0].id) && id.type !== 'STREAMING'){
                member?.roles.remove(data[1].id)
            }
        }
    })
    
}

export const config = {
    displayName: 'Twitch Status',
    dbName: 'TWITCH_STATUS'
}
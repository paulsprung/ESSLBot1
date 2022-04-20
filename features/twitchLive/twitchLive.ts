import { Client, Role, ActivityType } from "discord.js";
import twitchroleSchema from "../../models/twitchrole-Schema";


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
            const results = await twitchroleSchema.findById(guild.id)
            if(!results){
                return
            }
            const { troleId, lroleId} = results
            const trole = guild.roles.cache.get(troleId) as Role
            const lrole = guild.roles.cache.get(lroleId) as Role
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
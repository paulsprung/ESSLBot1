import { Client, GuildMemberRoleManager, Interaction, Role, TextChannel } from "discord.js";
import verifychannelSchema from "../models/verifychannelschema";

const verifyData = {} as {
    // guildID: [channel, role]
    [key: string]: [TextChannel, Role]
}

export default (client: Client) => {
    client.on('interactionCreate', async interaction => {
        const { guild, id } = interaction

        if(!interaction.isButton() || !guild){
            return
        }

        let data = verifyData[guild.id]
        console.log(data)
        if(!data){
            const results = await verifychannelSchema.findById(guild.id)
            console.log(results)
            if(!results){
                return
            }
            const { channelId, roleId} = results
            const channel = guild.channels.cache.get(channelId) as TextChannel
            const role = guild.roles.cache.get(roleId) as Role
            data = verifyData[guild.id] = [channel, role]
        }

        if(interaction.channel?.id === data[0].id){
            const member = guild.members.cache.get(interaction.user.id)
            member!.roles.add(data[1])
            interaction.reply({
                content:'Welcome',
                ephemeral: true
            })

        }
        
    })
}

export const config = {
    displayName: 'Verification',
    dbName: 'VERIFICATION'
}
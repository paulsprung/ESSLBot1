import { Client, GuildMemberRoleManager, Interaction, Role, TextChannel } from "discord.js";
import betaaccessSchema from "../models/betaaccessSchema";

const betaaccessData = {} as {
    // guildID: [channel, role]
    [key: string]: [TextChannel, Role]
}

export default (client: Client) => {
    client.on('interactionCreate', async interaction => {
        const { guild, id } = interaction

        if(!interaction.isButton() || !guild){
            return
        }

        let data = betaaccessData[guild.id]
        if(!data){
            const results = await betaaccessSchema.findById(guild.id)
            if(!results){
                return
            }
            console.log('in here')
            const { channelId, roleId} = results
            const channel = guild.channels.cache.get(channelId) as TextChannel
            const role = guild.roles.cache.get(roleId) as Role
            data = betaaccessData[guild.id] = [channel, role]
        }
        if(interaction.channel?.id === data[0].id){
            const member = guild.members.cache.get(interaction.user.id)
            member!.roles.remove(data[1])
            interaction.reply({
                content:'Have fun!',
                ephemeral: true
            })

        }
        
    })
}

export const config = {
    displayName: 'Verification',
    dbName: 'VERIFICATION'
}
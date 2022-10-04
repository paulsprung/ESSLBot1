import { Client, Role, TextChannel } from "discord.js";
import guildinfoSchema from "../../models/guildinfo-Schema";

const guildinfoData = {} as {
    // guildID: [channel, role]
    [key: string]: [TextChannel, Role]
}

export default (client: Client) => {
    client.on('interactionCreate', async interaction => {
        const { guild, id } = interaction

        if(!interaction.isButton() || !guild){
            return
        }

        let data = guildinfoData[guild.id]
        if(!data){
            const results = await guildinfoSchema.findById(guild.id)
            if(!results){
                return
            }
            const { channelId, roleId} = results
            const channel = guild.channels.cache.get(channelId) as TextChannel
            const role = guild.roles.cache.get(roleId) as Role
            data = guildinfoData[guild.id] = [channel, role]
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
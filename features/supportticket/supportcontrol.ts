import { CategoryChannel, Client, MessageSelectMenu, TextChannel, MessageEmbed, MessageActionRow, MessageButton, ButtonInteraction, Collection, Options, Role, GuildMember } from "discord.js";
import supportchannelSchema from "../../models/supportchannel-Schema";
import channelInfoSchema from "../../models/tempchannelmodels/channelInfoSchema";

const supportchannelData = {} as {
    // guildID: [channel, role]
    [key: string]: [ CategoryChannel, Role]
}

export default (client: Client) => {
    client.on('interactionCreate', async interaction => {
        const { guild, id } = interaction

        if(!interaction.isButton() || !guild){
            return
        }

        let data = supportchannelData[guild.id]
        if(!data){
            const results = await supportchannelSchema.findById(guild.id)
            if(!results){
                return
            }
            const { categoryId, roleId} = results
            const category = guild.channels.cache.get(categoryId) as CategoryChannel
            const role = guild.roles.cache.get(roleId) as Role
            data = supportchannelData[guild.id] = [category, role]
        }

        let channel = interaction.channel as TextChannel
        let member = interaction.member as GuildMember
        if(channel.parent!.id === data[0].id){
            if(member.roles.cache.has(data[1].id) || member.permissions.has("ADMINISTRATOR"))
            {
                if(interaction.customId === 'Claim'){
                    channel.send({
                        content: `<@${interaction.user.id}> claimed the ticket!`
                    })
                    interaction.reply({
                        content: `you claimed the ticket`,
                        ephemeral: true
                    })
                }
                else if(interaction.customId === 'Close'){
                    channel.delete()
                }
            }else{
                interaction.reply({
                    content: 'Only Supporter can claim/close a ticket!',
                    ephemeral: true
                })
            }
        }
    })
}
export const config = {
    displayName: 'Supportcontrol',
    dbName: 'SUPPORTCONTROL'
}
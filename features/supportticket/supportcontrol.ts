import { CategoryChannel, Client, MessageSelectMenu, TextChannel, MessageEmbed, MessageActionRow, MessageButton, ButtonInteraction, Collection, Options, Role, GuildMember } from "discord.js";
import guildinfoSchema from "../../models/guildinfo-Schema";

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
            const results = await guildinfoSchema.findById(guild.id)
            if(!results){
                return
            }
            const { supportcategoryId, supportroleId} = results
            const category = guild.channels.cache.get(supportcategoryId) as CategoryChannel
            const role = guild.roles.cache.get(supportroleId) as Role
            data = supportchannelData[guild.id] = [category, role]
        }

        let channel = interaction.channel as TextChannel
        let member = interaction.member as GuildMember
        if(channel.parent !== null){
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
        }
    })
}
export const config = {
    displayName: 'Supportcontrol',
    dbName: 'SUPPORTCONTROL'
}
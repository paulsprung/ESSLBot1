import { CategoryChannel, Client, MessageSelectMenu, TextChannel, MessageEmbed, MessageActionRow, MessageButton,   Role } from "discord.js";
import guildinfoSchema from "../../models/guildinfo-Schema";

const supportchannelData = {} as {
    // guildID: [channel, role]
    [key: string]: [TextChannel, CategoryChannel, Role]
}

export default (client: Client) => {
    client.on('interactionCreate', async interaction => {
        const { guild, id } = interaction

        if(!interaction.isSelectMenu() || !guild){
            return
        }

        let data = supportchannelData[guild.id]
        if(!data){
            const results = await guildinfoSchema.findById(guild.id)
            if(!results){
                return
            }
            const { supportchannelId, supportcategoryId, supportroleId} = results
            const channel = guild.channels.cache.get(supportchannelId) as TextChannel
            const category = guild.channels.cache.get(supportcategoryId) as CategoryChannel
            const role = guild.roles.cache.get(supportroleId) as Role
            data = supportchannelData[guild.id] = [channel, category, role]
        }

        if(interaction.channel?.id === data[0].id){
            const component = interaction.component as MessageSelectMenu
            const selected = component.options.filter((option) => {
                return interaction.values.includes(option.value)
            })
            for (const id of selected){
                const channel = await guild.channels.create(`${id.value}-ticket`, {
                    parent: data[1].id,
                    type: 'GUILD_TEXT',
                    permissionOverwrites: [{
                        id: guild.roles.everyone,
                        deny: ['VIEW_CHANNEL']
                    },{
                        id: interaction.user.id,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                    },{
                        id: data[2].id,
                        allow:['VIEW_CHANNEL', 'SEND_MESSAGES']
                    }]
                    
                })
            
                const embed = new MessageEmbed()
                    .setColor('#e3000b')
                    .setTitle(`${id.value} Ticket`)
                    .setDescription('Quickly describe your needs, a Supporter will be there soon!')
                    .setTimestamp()
                    .setFooter({ text: 'ESSL Bot', iconURL: 'https://imgur.com/Eo323Sd.jpg' });


                const row = new MessageActionRow() 
                    .addComponents(
                        new MessageButton()
                            .setCustomId('Claim')
                            .setEmoji('✔️')
                            .setLabel('Claim')
                            .setStyle('PRIMARY')
                    )
                    .addComponents(
                        new MessageButton()
                                .setCustomId('Close')
                            .setLabel('Close')
                            .setStyle('DANGER')
                    )

                channel.send(`<@${interaction.user.id}>`)
                channel.send({
                    embeds : [embed],
                    components: [row],
                })
            
                interaction.reply({
                    content:`created support-channel: <#${channel.id}>`,
                    ephemeral: true
                })
                //Code for the Thread support, not finished
                //requires guild level 2 
                /*let channel = guild.channels.cache.find(channel => channel.name === id.value) as TextChannel
                if(channel!.parentId === data[1].id){
                    channel.threads.create({
                        name: `${id.value}-ticket`,
	                    autoArchiveDuration: 60,
	                    type: 'GUILD_PRIVATE_THREAD',
	                    reason: `${interaction.user.username} created a ticket`,
                    })
                    const thread = channel.threads.cache.get(`${id.value}-ticket`)
                    console.log(thread)
                    await thread!.members.add(interaction.user.id)
                }*/

            }
            
        }
        
    })
}

export const config = {
    displayName: 'SupportTicket',
    dbName: 'SUPPORTTICKET'
}
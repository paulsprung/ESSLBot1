import { Client, EmojiIdentifierResolvable, GuildMember, MessageActionRow, MessageButton, MessageButtonStyleResolvable, Role, TextChannel } from 'discord.js'
import { ICommand } from "wokcommands";

const buttonStyles = ['primary', 'secondary', 'sucess', 'danger']
const prefix = 'button-roles'

export default {
    category: 'Utility',
    description: 'Adds an auto role to a message via buttons',

    slash: true,
    testOnly: false,
    guildOnly: true,

    requiredPermissions: ['ADMINISTRATOR'],

    minArgs: 4,
    expectedArgs: '<role>, <emoji>, <button-style>, <button-label>',
    expectedArgsTypes: ['ROLE', 'STRING', 'STRING', 'STRING'],

    options: [
        {
            name: 'channel',
            description: 'channel the message is in',
            type: 'CHANNEL',
            required: true,
        },
        {
            name: 'message',
            description: 'message the role gets added',
            type: 'STRING',
            required: true,
        },
        {
            name: 'role',
            description: 'The role to add to the user',
            type: 'ROLE',
            required: true,  
        },
        {
            name: 'emoji',
            description: 'the emoji to use for the button',
            type: 'STRING',
            required: true,
        },
        {
            name: 'button-style',
            description: 'The style of the button',
            type: 'STRING',
            required: true,
            choices: buttonStyles.map((style) => ({
                name: style,
                value: style.toUpperCase(),
            })),
        },
        {
            name: 'button-label',
            description: 'The label of the button',
            type: 'STRING',
            required: true,
        },
    ],

    init: (client: Client) => {
        client.on('interactionCreate', (Interaction) => {
            if(!Interaction.isButton()){
                return
            }

            const {guild, customId } = Interaction
            if(!guild || !customId.startsWith(prefix)){
                return
            }

            const roleId = customId.replace(prefix, '')
            const member = Interaction.member as GuildMember

            if(member.roles.cache.has(roleId)){
                member.roles.remove(roleId)

                Interaction.reply({
                    ephemeral:true,
                    content: `You no longer have the <@${roleId}> role.`,
                })
            } else {
                member.roles.add(roleId)

                Interaction.reply({
                    ephemeral: true,
                    content: `You now have the <@${roleId}> role`
                })
            }
        })
    },



    callback: async ({guild, message, interaction, args}) => {
        
        args.shift()
        let channel: TextChannel
        if (message){
            channel = message.mentions.channels.first() as TextChannel
        } else {
            channel = interaction.options.getChannel('channel') as TextChannel
        }

        const msg = args.shift()
        
        args.shift()
        let role: Role
        if(message){
            role = message.mentions.roles.first() as Role
        } else {
            role = interaction.options.getRole('role') as Role
        }

        const emoji = args.shift()

        const buttonStyle = args.shift() || 'primary'
        
        
        if(!buttonStyles.includes(buttonStyle.toLowerCase())){
            return `Unknown button style. Valid styles are: "${(buttonStyles.join(', '))}"`
        }
    
        const buttonlabel = args.join(' ')
    
        const roleMessage = await channel.messages.fetch(msg!)
        const rows = roleMessage.components

        const button = new MessageButton()
            .setLabel(buttonlabel)
            .setEmoji(emoji as EmojiIdentifierResolvable)
            .setStyle(buttonStyle as MessageButtonStyleResolvable)
            .setCustomId(`${prefix}${role.id}`)
            let added = false

        for(const row of rows){
            if(row.components.length < 5){
                row.addComponents(button)
                added = true
                break
            }
        }

        if(!added){
            if(rows.length >= 5){
                return{
                    custom: true,
                    ephermeral: true,
                    content: 'Cannot add more buttons to this message.',
                }
            }

            rows.push(new MessageActionRow().addComponents(button))
             
        }

        roleMessage!.edit({
            components: rows,
        })

        return {
            custom: true,
            ephermeral: false,
            content: 'Added button to role message'

        }
    }
} as ICommand
import { MessageEmbed } from 'discord.js';
import { ICommand } from 'wokcommands';

export default {
    category: 'info',
    description: 'Zeigt Info über den Server',

    slash: true,
    testOnly: true,

    requiredPermissions: ['ADMINISTRATOR'],
    
    callback: ({ interaction, guild, client }) => {
        const embed = new MessageEmbed()
            .setAuthor({ name: guild?.name! })
            .setThumbnail(guild?.iconURL()!)
            .setFooter({ text: `Info angefragt von ${interaction.user.tag}` })
            .addFields([
                {
                    name: 'Mitglieder',
                    value: guild?.memberCount.toString()!,
                    inline: true,
                },
                {
                    name: 'Erstellt am',
                    value: guild?.createdAt.toISOString().split('T')[0]!,
                    inline: true,
                },
                {
                    name: 'Besitzer',
                    value: `<@${guild?.ownerId!}>`,
                    inline: true,
                },
                {
                    name: 'Verifiziert',
                    value: guild?.verified ? 'Ja' : 'Nein',
                    inline: true,
                },
                {
                    name: 'Server Command Prefix',
                    value: '/',
                    inline: true,
                },
                {
                    name: 'Invite',
                    value: 'https://discord.gg/upspyPFc96',
                    inline: true,
                },
            ]);

        return embed;
    },
} as ICommand;

import { GuildMember, MessageEmbed } from 'discord.js';
import { ICommand } from 'wokcommands';

export default {
    category: 'info',
    description: 'Zeigt Info über den User',

    maxArgs: 1,
    expectedArgs: '[User]',

    options: [
        {
            name: 'user',
            description: 'User für den die Info abgerufen werden soll',
            type: 'USER',
            required: false,
        },
    ],

    slash: true,
    testOnly: true,

    callback: ({ interaction, member }) => {
        let target = interaction.options.getMember('user') as GuildMember;
        if (!target) {
            target = member;
        }
        const embed = new MessageEmbed()
            .setAuthor({
                name: `User Info für ${target.user.username}`,
                iconURL: target.displayAvatarURL(),
            })
            .setFooter({
                text: `User Info angefragt von ${interaction.user.tag}`,
            })
            .addFields([
                {
                    name: 'User Tag',
                    value: target.user.tag,
                    inline: true,
                },
                {
                    name: 'Ist Bot',
                    value: target.user.bot ? 'Ja' : 'Nein',
                    inline: true,
                },
                {
                    name: 'Nickname',
                    value: target.nickname || 'Keiner',
                    inline: true,
                },
                {
                    name: 'Server beigetreten',
                    value: target.joinedAt!.toISOString().split('T')[0],
                    inline: true,
                },
                {
                    name: 'Discord beigetreten',
                    value: target.user.createdAt.toISOString().split('T')[0],
                    inline: true,
                },
                {
                    name: 'Rollen Anzahl',
                    value: (target.roles.cache.size - 1).toString(),
                    inline: true,
                },
            ]);

        return embed;
    },
} as ICommand;

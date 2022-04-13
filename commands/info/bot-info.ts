import { MessageEmbed } from 'discord.js';
import { ICommand } from 'wokcommands';
const { version } = require('../../package.json');

export default {
    category: 'info',
    description: 'Zeigt Info über den Bot',

    slash: true,
    testOnly: true,

    callback: ({ interaction, client }) => {
        const embed = new MessageEmbed()
            .setAuthor({
                name: `Info über den ${client.user?.username} Bot`,
            })
            .setFooter({
                text: `Info angefragt von ${interaction.user.tag}`,
            })
            .addFields([
                {
                    name: 'Bot Tag',
                    value: client.user?.tag!,
                    inline: true,
                },
                {
                    name: 'Version',
                    value: version,
                    inline: true,
                },
                {
                    name: 'Server Command Prefix',
                    value: '/',
                    inline: true,
                },
                {
                    name: 'Zeit seit letztem Neustart',
                    value: `${process.uptime().toFixed(2)}s`,
                    inline: true,
                },
                {
                    name: 'Server Anzahl',
                    value: client.guilds.cache.size.toString(),
                    inline: true,
                },
                {
                    name: 'Kontakt',
                    value: '<@837661782151659560> / <@433645584696475653>',
                    inline: true,
                },
            ]);

        return embed;
    },
} as ICommand;

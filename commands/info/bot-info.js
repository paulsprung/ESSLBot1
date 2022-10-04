"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const { version } = require('../../package.json');
exports.default = {
    category: 'info',
    description: 'Zeigt Info über den Bot',
    slash: true,
    testOnly: false,
    requiredPermissions: ['ADMINISTRATOR'],
    callback: ({ interaction, client }) => {
        var _a, _b;
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor({
            name: `Info über den ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.username} Bot`,
        })
            .setFooter({
            text: `Info angefragt von ${interaction.user.tag}`,
        })
            .addFields([
            {
                name: 'Bot Tag',
                value: (_b = client.user) === null || _b === void 0 ? void 0 : _b.tag,
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
};

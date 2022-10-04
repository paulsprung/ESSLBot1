"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    category: 'info',
    description: 'Zeigt Info über den Server',
    slash: true,
    testOnly: true,
    requiredPermissions: ['ADMINISTRATOR'],
    callback: ({ interaction, guild, client }) => {
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor({ name: guild === null || guild === void 0 ? void 0 : guild.name })
            .setThumbnail(guild === null || guild === void 0 ? void 0 : guild.iconURL())
            .setFooter({ text: `Info angefragt von ${interaction.user.tag}` })
            .addFields([
            {
                name: 'Mitglieder',
                value: guild === null || guild === void 0 ? void 0 : guild.memberCount.toString(),
                inline: true,
            },
            {
                name: 'Erstellt am',
                value: guild === null || guild === void 0 ? void 0 : guild.createdAt.toISOString().split('T')[0],
                inline: true,
            },
            {
                name: 'Besitzer',
                value: `<@${guild === null || guild === void 0 ? void 0 : guild.ownerId}>`,
                inline: true,
            },
            {
                name: 'Verifiziert',
                value: (guild === null || guild === void 0 ? void 0 : guild.verified) ? 'Ja' : 'Nein',
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
};

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const rolemessage_Schemax_1 = __importDefault(require("../../../models/rolemessage-Schemax"));
const buttonStyles = ['primary', 'secondary', 'sucess', 'danger'];
const prefix = 'button-roles';
exports.default = {
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
    init: (client) => {
        client.on('interactionCreate', (Interaction) => {
            if (!Interaction.isButton()) {
                return;
            }
            const { guild, customId } = Interaction;
            if (!guild || !customId.startsWith(prefix)) {
                return;
            }
            const roleId = customId.replace(prefix, '');
            const member = Interaction.member;
            if (member.roles.cache.has(roleId)) {
                member.roles.remove(roleId);
                Interaction.reply({
                    ephemeral: true,
                    content: `You no longer have the <@${roleId}> role.`,
                });
            }
            else {
                member.roles.add(roleId);
                Interaction.reply({
                    ephemeral: true,
                    content: `You now have to <@${roleId}> role`
                });
            }
        });
    },
    callback: ({ guild, message, interaction, args }) => __awaiter(void 0, void 0, void 0, function* () {
        args.shift();
        let channel;
        if (message) {
            channel = message.mentions.channels.first();
        }
        else {
            channel = interaction.options.getChannel('channel');
        }
        const msg = args.shift();
        args.shift();
        let role;
        if (message) {
            role = message.mentions.roles.first();
        }
        else {
            role = interaction.options.getRole('role');
        }
        const emoji = args.shift();
        const buttonStyle = args.shift() || 'primary';
        if (!buttonStyles.includes(buttonStyle.toLowerCase())) {
            return `Unknown button style. Valid styles are: "${(buttonStyles.join(', '))}"`;
        }
        const buttonlabel = args.join(' ');
        const data = yield rolemessage_Schemax_1.default.findById(guild.id);
        if (!data) {
            return {
                custom: true,
                ephermeral: true,
                content: 'No role message found. Send one using /rolemesg'
            };
        }
        const roleMessage = yield channel.messages.fetch(msg);
        const rows = roleMessage.components;
        const button = new discord_js_1.MessageButton()
            .setLabel(buttonlabel)
            .setEmoji(emoji)
            .setStyle(buttonStyle)
            .setCustomId(`${prefix}${role.id}`);
        let added = false;
        for (const row of rows) {
            if (row.components.length < 5) {
                row.addComponents(button);
                added = true;
                break;
            }
        }
        if (!added) {
            if (rows.length >= 5) {
                return {
                    custom: true,
                    ephermeral: true,
                    content: 'Cannot add more buttons to this message.',
                };
            }
            rows.push(new discord_js_1.MessageActionRow().addComponents(button));
        }
        roleMessage.edit({
            components: rows,
        });
        return {
            custom: true,
            ephermeral: true,
            content: 'Added button to role message'
        };
    })
};

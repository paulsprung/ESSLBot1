"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const discord_js_1 = __importStar(require("discord.js"));
const supportchannel_Schema_1 = __importDefault(require("../../models/supportchannel-Schema"));
exports.default = {
    category: 'Configuration',
    description: 'sets beta button',
    permissions: ['ADMINISTRATOR'],
    minArgs: 1,
    expectedArgs: '<channel> <category> <role>',
    slash: true,
    //testOnly: true,
    options: [
        {
            name: 'channel',
            description: 'Your support Channel',
            required: true,
            type: discord_js_1.default.Constants.ApplicationCommandOptionTypes.CHANNEL
        }, {
            name: 'category',
            description: 'Your support category',
            required: true,
            type: discord_js_1.default.Constants.ApplicationCommandOptionTypes.CHANNEL
        }, {
            name: 'role',
            description: 'Support Role',
            required: true,
            type: discord_js_1.default.Constants.ApplicationCommandOptionTypes.ROLE
        }
    ],
    callback: ({ guild, message, interaction, args }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!guild) {
            return 'Please use this command within a server';
        }
        const target = interaction.options.getChannel('channel');
        if (!target || target.type !== 'GUILD_TEXT') {
            return 'Please tag a text channel.';
        }
        const category = interaction.options.getChannel('category');
        if (!category || category.type !== 'GUILD_CATEGORY') {
            return 'Please enter a category.';
        }
        const role = interaction.options.getRole('role');
        if (!role) {
            return 'Please enter a Support Role.';
        }
        //embeded und dropdown menu 
        const embed = new discord_js_1.MessageEmbed()
            .setColor('#e3000b')
            .setTitle('Support Ticket')
            .setDescription('Choose the type off help you would need!')
            .setTimestamp()
            .setFooter({ text: 'ESSL Bot', iconURL: 'https://imgur.com/Eo323Sd.jpg' });
        const row = new discord_js_1.MessageActionRow()
            .addComponents(new discord_js_1.MessageSelectMenu()
            .setCustomId('SupportMenu')
            .setPlaceholder('Nothing selected')
            .addOptions([
            {
                label: 'Support',
                description: 'A normal Support ticket if something isn`t working',
                emoji: '✉️',
                value: 'Support',
                default: true
            },
            {
                label: 'Report',
                description: 'To report a user in the discord',
                emoji: '⚠️',
                value: 'Report',
            },
            {
                label: 'Tournament',
                description: 'Only for Player, to inform report etc',
                emoji: '🏆',
                value: 'Tournament',
            },
            {
                label: 'Application',
                description: 'If you want to apply for the ESSL Team',
                emoji: '💬',
                value: 'Application',
            },
            {
                label: 'Bot',
                description: 'Whenever you find a bug in the bots-system',
                emoji: '🤖',
                value: 'Bot',
            }
        ])
            .setMaxValues(1));
        target.send({
            embeds: [embed],
            components: [row]
        });
        yield supportchannel_Schema_1.default.findOneAndUpdate({
            _id: guild.id
        }, {
            _id: guild.id,
            categoryId: category.id,
            channelId: target.id,
            roleId: role.id,
        }, {
            upsert: true
        });
        return 'support channel set';
    })
};

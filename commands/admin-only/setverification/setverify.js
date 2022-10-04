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
const discord_js_2 = require("discord.js");
const guildinfo_Schema_1 = __importDefault(require("../../../models/guildinfo-Schema"));
exports.default = {
    category: 'Configuration',
    description: 'Set the temp verify!',
    permissions: ['ADMINISTRATOR'],
    minArgs: 1,
    expectedArgs: '<channel> <role>',
    slash: true,
    testOnly: false,
    options: [
        {
            name: 'channel',
            description: 'Verify channel.',
            required: true,
            type: discord_js_1.default.Constants.ApplicationCommandOptionTypes.CHANNEL
        }, {
            name: 'role',
            description: 'Which role the user gets',
            required: true,
            type: discord_js_1.default.Constants.ApplicationCommandOptionTypes.ROLE
        }
    ],
    callback: ({ guild, interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!guild) {
            return 'Please use this command within a server';
        }
        const target = interaction.options.getChannel('channel');
        if (!target || target.type !== 'GUILD_TEXT') {
            return 'Please tag a text channel.';
        }
        const give = interaction.options.getRole('role');
        if (!give) {
            return 'Please enter a role.';
        }
        //embeded und buttons 
        const embed = new discord_js_2.MessageEmbed()
            .setColor('#e3000b')
            .setTitle('Accept the rules')
            .setDescription('To accept the rules click on the button below!')
            .setThumbnail('https://i.imgur.com/L8DSPNg.png')
            .setTimestamp()
            .setFooter({ text: 'ESSL Bot', iconURL: 'https://imgur.com/Eo323Sd.jpg' });
        const row = new discord_js_1.MessageActionRow()
            .addComponents(new discord_js_1.MessageButton()
            .setCustomId('verify')
            .setEmoji('✔️')
            .setLabel('verify')
            .setStyle('SUCCESS'));
        target.send({
            embeds: [embed],
            components: [row]
        });
        yield guildinfo_Schema_1.default.findOneAndUpdate({
            _id: guild.id
        }, {
            _id: guild.id,
            serverName: guild.name,
            joinroleId: give.id,
            joinchannelId: target.id
        }, {
            upsert: true
        });
        return 'Verify Channel gesetzt';
    })
};

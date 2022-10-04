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
const guildinfo_Schema_1 = __importDefault(require("../../../models/guildinfo-Schema"));
exports.default = {
    category: 'Configuration',
    description: 'sends Autorole Messages',
    permissions: ['ADMINISTRATOR'],
    minArgs: 1,
    expectedArgs: '<channel>',
    slash: true,
    testOnly: false,
    options: [
        {
            name: 'channel',
            description: 'Autorole Channel',
            required: true,
            type: discord_js_1.default.Constants.ApplicationCommandOptionTypes.CHANNEL
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
        //embeded und buttons 
        const schoolembed = new discord_js_1.MessageEmbed()
            .setColor('#e3000b')
            .setTitle('**School**')
            .setDescription('Get your school role here!')
            .setTimestamp()
            .setFooter({ text: 'ESSL Bot', iconURL: 'https://imgur.com/Eo323Sd.jpg' });
        const gameembed = new discord_js_1.MessageEmbed()
            .setColor('#e3000b')
            .setTitle('**Games**')
            .setDescription('Get your Gamerole here!')
            .setTimestamp()
            .setFooter({ text: 'ESSL Bot', iconURL: 'https://imgur.com/Eo323Sd.jpg' });
        const newsembed = new discord_js_1.MessageEmbed()
            .setColor('#e3000b')
            .setTitle('**News**')
            .setDescription('Click to get specified news!')
            .setTimestamp()
            .setFooter({ text: 'ESSL Bot', iconURL: 'https://imgur.com/Eo323Sd.jpg' });
        const feedback = new discord_js_1.MessageEmbed()
            .setColor('#e3000b')
            .setTitle('**Setup**')
            .setDescription('Autorolechannel set!')
            .addFields({ name: 'add Autoroles', value: '/addbuttonrole' }, { name: 'add the valorant Autorole', value: '/setvaloautorole', inline: true }, { name: 'add the RocketLeague Autorole', value: 'need to work on it', inline: true })
            .setTimestamp()
            .setFooter({ text: 'ESSL Bot', iconURL: 'https://imgur.com/Eo323Sd.jpg' });
        yield target.send({
            files: ["https://i.imgur.com/Ldrkg4n.jpg"],
        });
        yield target.send({
            embeds: [schoolembed],
        });
        yield target.send({
            embeds: [gameembed],
        });
        yield target.send({
            embeds: [newsembed],
        });
        yield guildinfo_Schema_1.default.findOneAndUpdate({
            _id: guild.id
        }, {
            _id: guild.id,
            serverName: guild.name,
            autorolechannelId: target.id,
        }, {
            upsert: true
        });
        return 'autorolechannelset';
    })
};

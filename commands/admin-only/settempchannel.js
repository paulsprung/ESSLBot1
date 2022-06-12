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
const discord_js_1 = __importDefault(require("discord.js"));
const tempchannel_schema_1 = __importDefault(require("../../models/tempchannelmodels/tempchannel-schema"));
exports.default = {
    category: 'Configuration',
    description: 'Set the temp channel!',
    permissions: ['ADMINISTRATOR'],
    minArgs: 2,
    expectedArgs: '<channel> <category>',
    slash: true,
    //testOnly: true,
    options: [
        {
            name: 'channel',
            description: 'Join channel.',
            required: true,
            type: discord_js_1.default.Constants.ApplicationCommandOptionTypes.CHANNEL
        },
        {
            name: 'category',
            description: 'Category you want your Temp Channels in',
            required: true,
            type: discord_js_1.default.Constants.ApplicationCommandOptionTypes.CHANNEL
        }
    ],
    callback: ({ guild, message, interaction, args }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!guild) {
            return 'Please use this command within a server';
        }
        const target = interaction.options.getChannel('channel');
        if (!target || target.type !== 'GUILD_VOICE') {
            return 'Please tag a voice channel.';
        }
        const category = interaction === null || interaction === void 0 ? void 0 : interaction.options.getChannel('category');
        if (!category || category.type !== 'GUILD_CATEGORY') {
            return 'Please tag a category channel.';
        }
        yield tempchannel_schema_1.default.findOneAndUpdate({
            _id: guild.id
        }, {
            _id: guild.id,
            categoryId: category.id,
            channelId: target.id
        }, {
            upsert: true
        });
        return 'Temp Channel gesetzt';
    })
};

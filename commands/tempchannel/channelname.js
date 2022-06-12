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
const channelInfoSchema_1 = __importDefault(require("../../models/tempchannelmodels/channelInfoSchema"));
const channelInfoData = {};
exports.default = {
    category: 'tempchannel settings',
    description: 'set Name for the channel.',
    minArgs: 1,
    expectedArgs: '<text>',
    slash: true,
    //testOnly: true,
    ephemeral: true,
    options: [
        {
            name: 'text',
            description: 'The channel name',
            required: true,
            type: discord_js_1.default.Constants.ApplicationCommandOptionTypes.STRING
        }
    ],
    callback: ({ guild, message, interaction, args }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!guild) {
            return {
                content: 'Please use this command within a server',
                ephemeral: true,
                custom: true
            };
        }
        const member = guild.members.cache.get(interaction.user.id);
        if (!(member === null || member === void 0 ? void 0 : member.voice.channel)) {
            return 'you must be connected to a voicechannel';
        }
        if (member.voice.channel) {
            let data = channelInfoData[member.voice.channel.id];
            if (!data) {
                const results = yield channelInfoSchema_1.default.findById(member.voice.channel.id);
                if (!results) {
                    return;
                }
                const { channelId, categoryId, ownerId } = results;
                const category = guild.channels.cache.get(categoryId);
                const owner = guild.members.cache.get(ownerId);
                const channel = guild.channels.cache.get(channelId);
                data = channelInfoData[member.voice.channel.id] = [channel, category, owner];
            }
            if (member === data[2]) {
                let text = interaction === null || interaction === void 0 ? void 0 : interaction.options.getString('text');
                member.voice.channel.setName(text);
                return {
                    content: 'Name gesetzt',
                    ephemeral: true,
                    custom: true
                };
            }
        }
        return {
            content: 'You must be in a Voicechannel and the creator off it!',
            ephemeral: true,
            custom: true
        };
    })
};

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
    description: 'set Sizefor the channel',
    minArgs: 1,
    expectedArgs: '<number>',
    slash: true,
    testOnly: false,
    ephemeral: true,
    options: [
        {
            name: 'number',
            description: 'The channel size',
            required: true,
            type: discord_js_1.default.Constants.ApplicationCommandOptionTypes.INTEGER
        }
    ],
    callback: ({ guild, message, interaction, args }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!guild) {
            return 'Please use this command within a server';
        }
        const member = guild.members.cache.get(interaction.user.id);
        if (!(member === null || member === void 0 ? void 0 : member.voice.channel)) {
            return {
                content: 'Please use this command within a server',
                ephemeral: true,
                custom: true
            };
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
                let number = interaction === null || interaction === void 0 ? void 0 : interaction.options.getInteger('number');
                if (number >= 100 || number <= 0) {
                    number = 0;
                }
                data[0].setUserLimit(number);
                return {
                    content: 'Size gesetzt',
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

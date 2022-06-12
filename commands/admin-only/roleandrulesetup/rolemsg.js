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
const rolemessage_Schame_1 = __importDefault(require("../../../models/rolemessage-Schame"));
exports.default = {
    category: 'Utility',
    description: 'Sends a message',
    slash: true,
    testOnly: true,
    guildOnly: true,
    minArgs: 2,
    expectedArgs: '<channel> <message>',
    expectedArgsTypes: ['CHANNEL', 'STRING'],
    requiredPermissions: ['ADMINISTRATOR'],
    callback: ({ guild, message, interaction, args }) => __awaiter(void 0, void 0, void 0, function* () {
        args.shift();
        const text = args.join(' ');
        let channel;
        if (message) {
            channel = message.mentions.channels.first();
        }
        else {
            channel = interaction.options.getChannel('channel');
        }
        const sentMessage = yield channel.send(text);
        yield new rolemessage_Schame_1.default({
            _id: guild === null || guild === void 0 ? void 0 : guild.id,
            channelId: channel.id,
            messageId: sentMessage.id,
        }).save();
        if (interaction) {
            return {
                custom: true,
                content: 'Message sent',
                ephemeral: true,
            };
        }
    })
};

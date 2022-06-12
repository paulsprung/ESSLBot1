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
const twitchrole_Schema_1 = __importDefault(require("../../models/twitchrole-Schema"));
exports.default = {
    category: 'Configuration',
    description: 'Set the Twitch Roles',
    permissions: ['ADMINISTRATOR'],
    minArgs: 2,
    expectedArgs: '<role> <role>',
    slash: true,
    //testOnly: true,
    options: [
        {
            name: 'trole',
            description: 'The Twitch Role',
            required: true,
            type: discord_js_1.default.Constants.ApplicationCommandOptionTypes.ROLE
        },
        {
            name: 'lrole',
            description: 'The Live Role',
            required: true,
            type: discord_js_1.default.Constants.ApplicationCommandOptionTypes.ROLE
        }
    ],
    callback: ({ guild, message, interaction, args }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!guild) {
            return 'Please use this command within a server';
        }
        const trole = interaction.options.getRole('trole');
        if (!trole) {
            return 'please tag a Twitch Role.';
        }
        let lrole = interaction === null || interaction === void 0 ? void 0 : interaction.options.getRole('lrole');
        if (!lrole) {
            return 'please tag a Live Role.';
        }
        yield twitchrole_Schema_1.default.findOneAndUpdate({
            _id: guild.id
        }, {
            _id: guild.id,
            troleId: trole.id,
            lroleId: lrole.id
        }, {
            upsert: true
        });
        return 'Twitch Role gesetzt!';
    })
};

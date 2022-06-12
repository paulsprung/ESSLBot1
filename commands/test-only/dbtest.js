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
const test_schema_1 = __importDefault(require("../../models/test-schema"));
exports.default = {
    category: 'Testing',
    description: 'Tests writes into db',
    permissions: ['ADMINISTRATOR'],
    minArgs: 1,
    expectedArgs: '<text>',
    slash: true,
    testOnly: true,
    options: [
        {
            name: 'text',
            description: 'The welcome message.',
            required: true,
            type: discord_js_1.default.Constants.ApplicationCommandOptionTypes.STRING
        }
    ],
    callback: ({ guild, message, interaction, args }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!guild) {
            return 'Please use this command within a server';
        }
        let text = interaction === null || interaction === void 0 ? void 0 : interaction.options.getString('text');
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            yield new test_schema_1.default({
                message: text
            }).save();
        }), 1000);
        return 'Testing db';
    })
};

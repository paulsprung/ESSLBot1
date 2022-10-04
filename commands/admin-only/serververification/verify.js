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
const guildinfo_Schema_1 = __importDefault(require("../../../models/guildinfo-Schema"));
const guildinfoData = {};
exports.default = {
    category: 'Configuration',
    description: 'Set the guild verification!',
    permissions: ['ADMINISTRATOR'],
    slash: true,
    testOnly: false,
    callback: ({ guild }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!guild) {
            return 'Please use this command within a server';
        }
        let data = guildinfoData[guild.id];
        if (!data) {
            const results = yield guildinfo_Schema_1.default.findById(guild.id);
            if (!results) {
                return 'Guild not verified, please ask for Bot access in the Main ESSL Server or the Bot Owner';
            }
        }
        return 'Verified Guild';
    })
};

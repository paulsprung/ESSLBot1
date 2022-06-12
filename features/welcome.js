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
exports.config = void 0;
const welcome_schema_1 = __importDefault(require("../models/welcome-schema"));
const welcomeData = {};
exports.default = (client) => {
    client.on('guildMemberAdd', (member) => __awaiter(void 0, void 0, void 0, function* () {
        const { guild, id } = member;
        let data = welcomeData[guild.id];
        if (!data) {
            const results = yield welcome_schema_1.default.findById(guild.id);
            if (!results) {
                return;
            }
            const { channelId, text } = results;
            const channel = guild.channels.cache.get(channelId);
            data = welcomeData[guild.id] = [channel, text];
        }
        data[0].send({
            content: data[1].replace(/@/g, `<@${id}>`),
        });
    }));
};
exports.config = {
    displayName: 'Welcome Channel',
    dbName: 'WELCOME_CHANNEL'
};

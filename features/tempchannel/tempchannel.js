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
const tempchannel_schema_1 = __importDefault(require("../../models/tempchannelmodels/tempchannel-schema"));
const channelInfoSchema_1 = __importDefault(require("../../models/tempchannelmodels/channelInfoSchema"));
const tempchannelData = {};
exports.default = (client) => {
    client.on('voiceStateUpdate', (oldState, newState) => __awaiter(void 0, void 0, void 0, function* () {
        const { guild, id } = oldState;
        let data = tempchannelData[guild.id];
        if (!data) {
            const results = yield tempchannel_schema_1.default.findById(guild.id);
            if (!results) {
                return;
            }
            const { channelId, categoryId } = results;
            const channel = guild.channels.cache.get(channelId);
            const category = guild.channels.cache.get(categoryId);
            data = tempchannelData[guild.id] = [channel, category];
        }
        const user = yield client.users.fetch(newState.id);
        const member = newState.member;
        if (newState.channel === data[0]) {
            const joinchannel = yield guild.channels.create(`➤${user.username}'s Channel`, {
                type: 'GUILD_VOICE',
                parent: data[1],
            });
            member.voice.setChannel(joinchannel);
            yield new channelInfoSchema_1.default({
                _id: joinchannel.id,
                channelId: joinchannel.id,
                categoryId: data[1].id,
                ownerId: user.id,
            }).save();
        }
    }));
};
exports.config = {
    displayName: 'Temp Channel',
    dbName: 'TEMP_CHANNEL'
};

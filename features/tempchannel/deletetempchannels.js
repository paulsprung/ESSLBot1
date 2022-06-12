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
const channelInfoSchema_1 = __importDefault(require("../../models/tempchannelmodels/channelInfoSchema"));
const channelInfoData = {};
exports.default = (client) => {
    client.on('voiceStateUpdate', (oldState, newState) => __awaiter(void 0, void 0, void 0, function* () {
        const { guild, id } = oldState;
        if (oldState.channel) {
            let data = channelInfoData[oldState.channel.id];
            if (!data) {
                const results = yield channelInfoSchema_1.default.findById(oldState.channel.id);
                if (!results) {
                    return;
                }
                const { channelId, categoryId, ownerId } = results;
                const category = guild.channels.cache.get(categoryId);
                const owner = guild.members.cache.get(ownerId);
                const channel = guild.channels.cache.get(channelId);
                data = channelInfoData[oldState.channel.id] = [channel, category, owner];
            }
            if (data[0].members.size <= 0) {
                oldState.channel.delete();
                channelInfoSchema_1.default.findByIdAndDelete(oldState.channel.id);
            }
        }
    }));
};
exports.config = {
    dbName: 'TEMPCHANNE_DELETE',
    displayName: 'Delete Tempchannel'
};

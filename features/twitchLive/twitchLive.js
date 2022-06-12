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
const twitchrole_Schema_1 = __importDefault(require("../../models/twitchrole-Schema"));
const twitchroleData = {};
exports.default = (client) => {
    client.on('presenceUpdate', (oldMember, newMember) => __awaiter(void 0, void 0, void 0, function* () {
        const { guild, member } = newMember;
        if (!guild) {
            return;
        }
        let data = twitchroleData[guild.id];
        if (!data) {
            const results = yield twitchrole_Schema_1.default.findById(guild.id);
            if (!results) {
                return;
            }
            const { troleId, lroleId } = results;
            const trole = guild.roles.cache.get(troleId);
            const lrole = guild.roles.cache.get(lroleId);
            data = twitchroleData[guild.id] = [trole, lrole];
        }
        const status = newMember.activities.filter((activity) => {
            return activity.type;
        });
        for (const id of status) {
            if (member.roles.cache.has(data[0].id) && id.type === 'STREAMING') {
                member === null || member === void 0 ? void 0 : member.roles.add(data[1].id);
            }
            else if (member.roles.cache.has(data[0].id) && id.type !== 'STREAMING') {
                member === null || member === void 0 ? void 0 : member.roles.remove(data[1].id);
            }
        }
    }));
};
exports.config = {
    displayName: 'Twitch Status',
    dbName: 'TWITCH_STATUS'
};

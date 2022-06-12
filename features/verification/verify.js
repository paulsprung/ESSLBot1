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
const verifychannelschema_1 = __importDefault(require("../../models/verifychannelschema"));
const verifyData = {};
exports.default = (client) => {
    client.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const { guild, id } = interaction;
        if (!interaction.isButton() || !guild) {
            return;
        }
        let data = verifyData[guild.id];
        if (!data) {
            const results = yield verifychannelschema_1.default.findById(guild.id);
            if (!results) {
                return;
            }
            const { channelId, roleId } = results;
            const channel = guild.channels.cache.get(channelId);
            const role = guild.roles.cache.get(roleId);
            data = verifyData[guild.id] = [channel, role];
        }
        if (((_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.id) === data[0].id) {
            const member = guild.members.cache.get(interaction.user.id);
            member.roles.add(data[1]);
            interaction.reply({
                content: 'Welcome',
                ephemeral: true
            });
        }
    }));
};
exports.config = {
    displayName: 'Verification',
    dbName: 'VERIFICATION'
};

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
const guildinfo_Schema_1 = __importDefault(require("../../models/guildinfo-Schema"));
const supportchannelData = {};
exports.default = (client) => {
    client.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        const { guild, id } = interaction;
        if (!interaction.isButton() || !guild) {
            return;
        }
        let data = supportchannelData[guild.id];
        if (!data) {
            const results = yield guildinfo_Schema_1.default.findById(guild.id);
            if (!results) {
                return;
            }
            const { supportcategoryId, supportroleId } = results;
            const category = guild.channels.cache.get(supportcategoryId);
            const role = guild.roles.cache.get(supportroleId);
            data = supportchannelData[guild.id] = [category, role];
        }
        let channel = interaction.channel;
        let member = interaction.member;
        if (channel.parent !== null) {
            if (channel.parent.id === data[0].id) {
                if (member.roles.cache.has(data[1].id) || member.permissions.has("ADMINISTRATOR")) {
                    if (interaction.customId === 'Claim') {
                        channel.send({
                            content: `<@${interaction.user.id}> claimed the ticket!`
                        });
                        interaction.reply({
                            content: `you claimed the ticket`,
                            ephemeral: true
                        });
                    }
                    else if (interaction.customId === 'Close') {
                        channel.delete();
                    }
                }
                else {
                    interaction.reply({
                        content: 'Only Supporter can claim/close a ticket!',
                        ephemeral: true
                    });
                }
            }
        }
    }));
};
exports.config = {
    displayName: 'Supportcontrol',
    dbName: 'SUPPORTCONTROL'
};

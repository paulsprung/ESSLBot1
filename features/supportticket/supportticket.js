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
const discord_js_1 = require("discord.js");
const guildinfo_Schema_1 = __importDefault(require("../../models/guildinfo-Schema"));
const supportchannelData = {};
exports.default = (client) => {
    client.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const { guild, id } = interaction;
        if (!interaction.isSelectMenu() || !guild) {
            return;
        }
        let data = supportchannelData[guild.id];
        if (!data) {
            const results = yield guildinfo_Schema_1.default.findById(guild.id);
            if (!results) {
                return;
            }
            const { supportchannelId, supportcategoryId, supportroleId } = results;
            const channel = guild.channels.cache.get(supportchannelId);
            const category = guild.channels.cache.get(supportcategoryId);
            const role = guild.roles.cache.get(supportroleId);
            data = supportchannelData[guild.id] = [channel, category, role];
        }
        if (((_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.id) === data[0].id) {
            const component = interaction.component;
            const selected = component.options.filter((option) => {
                return interaction.values.includes(option.value);
            });
            for (const id of selected) {
                const channel = yield guild.channels.create(`${id.value}-ticket`, {
                    parent: data[1].id,
                    type: 'GUILD_TEXT',
                    permissionOverwrites: [{
                            id: guild.roles.everyone,
                            deny: ['VIEW_CHANNEL']
                        }, {
                            id: interaction.user.id,
                            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                        }, {
                            id: data[2].id,
                            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                        }]
                });
                const embed = new discord_js_1.MessageEmbed()
                    .setColor('#e3000b')
                    .setTitle(`${id.value} Ticket`)
                    .setDescription('Quickly describe your needs, a Supporter will be there soon!')
                    .setTimestamp()
                    .setFooter({ text: 'ESSL Bot', iconURL: 'https://imgur.com/Eo323Sd.jpg' });
                const row = new discord_js_1.MessageActionRow()
                    .addComponents(new discord_js_1.MessageButton()
                    .setCustomId('Claim')
                    .setEmoji('✔️')
                    .setLabel('Claim')
                    .setStyle('PRIMARY'))
                    .addComponents(new discord_js_1.MessageButton()
                    .setCustomId('Close')
                    .setLabel('Close')
                    .setStyle('DANGER'));
                channel.send(`<@${interaction.user.id}>`);
                channel.send({
                    embeds: [embed],
                    components: [row],
                });
                interaction.reply({
                    content: `created support-channel: <#${channel.id}>`,
                    ephemeral: true
                });
                //Code for the Thread support, not finished
                //requires guild level 2 
                /*let channel = guild.channels.cache.find(channel => channel.name === id.value) as TextChannel
                if(channel!.parentId === data[1].id){
                    channel.threads.create({
                        name: `${id.value}-ticket`,
                        autoArchiveDuration: 60,
                        type: 'GUILD_PRIVATE_THREAD',
                        reason: `${interaction.user.username} created a ticket`,
                    })
                    const thread = channel.threads.cache.get(`${id.value}-ticket`)
                    console.log(thread)
                    await thread!.members.add(interaction.user.id)
                }*/
            }
        }
    }));
};
exports.config = {
    displayName: 'SupportTicket',
    dbName: 'SUPPORTTICKET'
};

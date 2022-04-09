import { Client, CategoryChannel, GuildMember, VoiceChannel } from 'discord.js';
import channelInfoSchema from '../models/channelInfoSchema';

const channelInfoData = {} as {
    // guildID: [channel, category]
    [key: string]: [VoiceChannel, CategoryChannel, GuildMember];
};

export default (client: Client) => {
    client.on('voiceStateUpdate', async (oldState, newState) => {
        const { guild, id } = oldState;
        if (oldState.channel) {
            let data = channelInfoData[oldState.channel.id];

            if (!data) {
                const results = await channelInfoSchema.findById(
                    oldState.channel.id
                );
                if (!results) {
                    return;
                }
                const { channelId, categoryId, ownerId } = results;
                const category = guild.channels.cache.get(
                    categoryId
                ) as CategoryChannel;
                const owner = guild.members.cache.get(ownerId) as GuildMember;
                const channel = guild.channels.cache.get(
                    channelId
                ) as VoiceChannel;

                data = channelInfoData[oldState.channel.id] = [
                    channel,
                    category,
                    owner,
                ];
            }

            if (data[0].members.size <= 0) {
                oldState.channel.delete();
                channelInfoSchema.findByIdAndDelete(oldState.channel.id);
            }
        }
    });
};

export const config = {
    dbName: 'TEMPCHANNE_DELETE',
    displayName: 'Delete Tempchannel',
};

import { ICommand } from "wokcommands";
import guildinfoSchema from '../../../models/guildinfo-Schema';
import DJS, { Interaction } from "discord.js";

export default {
    category: 'Configuration',
    description: 'Set the guild verification!',

    permissions: ['ADMINISTRATOR'],

    ownerOnly: true,
    
    slash: true,
    testOnly: false,

    callback: async ({ guild }) => {
        if (!guild) {
            return 'Please use this command within a server';
        }

        setTimeout(async () => {
            new guildinfoSchema({
               _id: guild.id,
               serverName: guild.name
            }).save()
        }, 1000)
        return 'Verify Channel gesetzt';
    }
} as ICommand

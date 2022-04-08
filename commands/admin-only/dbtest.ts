import DJS from 'discord.js';
import testSchema from '../../models/test-schema';
import { ICommand } from 'wokcommands';

export default {
    category: 'Testing',
    description: 'Tests writes into db',

    permissions: ['ADMINISTRATOR'],

    minArgs: 1,
    expectedArgs: '<text>',

    slash: true,
    testOnly: true,

    options: [
        {
            name: 'text',
            description: 'The welcome message.',
            required: true,
            type: DJS.Constants.ApplicationCommandOptionTypes.STRING,
        },
    ],

    callback: async ({ guild, message, interaction, args }) => {
        if (!guild) {
            return 'Please use this command within a server';
        }

        let text = interaction?.options.getString('text');

        setTimeout(async () => {
            await new testSchema({
                message: text,
            }).save();
        }, 1000);
        return 'Testing db';
    },
} as ICommand;

import { ICommand } from "wokcommands";

export default {
    category: 'Testing',
    description: 'Simulates a join',

    permissions: ['ADMINISTRATOR'],
    slash: true,
    testOnly: true,

    callback: ({ member, client })=> {
        client.emit('guildMemberAdd', member)
        return 'Join Simulated!'
    }
}as ICommand
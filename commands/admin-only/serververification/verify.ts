import { ICommand } from "wokcommands";
import guildinfoSchema from "../../../models/guildinfo-Schema";
import DJS from "discord.js";


const guildinfoData = {} as {
    // guildID: [channel, category]
    [key: string]: []
}

export default {
    category: 'Configuration',
    description: 'Set the guild verification!',

    permissions: ['ADMINISTRATOR'],

    slash: true,
    testOnly: false,

    callback:async ({ guild }) => {
        if(!guild){
            return 'Please use this command within a server'
        }

        let data = guildinfoData[guild.id]
        if(!data){
            const results = await guildinfoSchema.findById(guild.id)
            if(!results){
                return 'Guild not verified, please ask for Bot access in the Main ESSL Server or the Bot Owner'
            }
        }
        return 'Verified Guild'
    }
} as ICommand
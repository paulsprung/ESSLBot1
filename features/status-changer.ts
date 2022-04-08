import { Client } from "discord.js";

export default (client: Client) => {
    const statusOptions = [
        'Bot in Development',
        '<3',
        'not Active in Testing phase',
    ]
    let counter = 0

    const updateStatus = () => {
        client.user?.setPresence({
            status: 'idle',
            activities: [{
                name: statusOptions[counter]
            }]
        })

        if(++counter >= statusOptions.length){
            counter = 0
        }
        setTimeout(updateStatus, 1000 * 60 * 5)
    }
    updateStatus()

}

export const config = {
    dbName: 'STATUS_CHANGER',
    displayName: 'Status Changer'
}
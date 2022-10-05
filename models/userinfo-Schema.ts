import mongoose, { Schema } from "mongoose"

const reqString = {
    type: String,
    require: true
}

const guildinfoSchema = new Schema({
    //Guild ID
    _id: reqString,
    userName: reqString,
    channelname: reqString,
    channelsize: reqString,
    channelstatus: reqString,    
    channelid: reqString,
    supportchannelId: reqString,
    supportroleId: reqString,
    twitchroleId: reqString,
    liveroleId: reqString,
})

const name = 'guildinfo'
export default mongoose.models[name] || mongoose.model(name, guildinfoSchema, name)
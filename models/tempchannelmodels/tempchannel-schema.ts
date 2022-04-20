import mongoose, { Schema } from "mongoose"

const reqString = {
    type: String,
    require: true
}

const tempchannelSchema = new Schema({
    //Guild ID
    _id: reqString,
    channelId: reqString,
    categoryId: reqString
})

const name = 'Temp-channel'
export default mongoose.models[name] || mongoose.model(name, tempchannelSchema, name)

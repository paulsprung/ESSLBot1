import mongoose, { Schema } from "mongoose"

const reqString = {
    type: String,
    require: true
}

const supportchannelSchema = new Schema({
    //Guild ID
    _id: reqString,
    categoryId: reqString,
    channelId: reqString,
    roleId: reqString,
    
})

const name = 'supportChannel'
export default mongoose.models[name] || mongoose.model(name, supportchannelSchema, name)

import mongoose, { Schema } from "mongoose"

const reqString = {
    type: String,
    require: true
}

const rolemessageSchema = new Schema({
    //Guild ID
    _id: reqString,
    channelId: reqString,
})

const name = 'autorole'
export default mongoose.models[name] || mongoose.model(name, rolemessageSchema, name)

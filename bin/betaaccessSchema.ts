import mongoose, { Schema } from "mongoose"

const reqString = {
    type: String,
    require: true
}

const betaaccessSchema = new Schema({
    //Guild ID
    _id: reqString,
    roleId: reqString,
    channelId: reqString,
})

const name = 'betaaccess'
export default mongoose.models[name] || mongoose.model(name, betaaccessSchema, name)

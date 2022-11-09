import mongoose, { Schema } from "mongoose"

const reqString = {
    type: String,
    require: true
}

const twitchroleSchema = new Schema({
    //Guild ID
    _id: reqString,
    troleId: reqString,
    lroleId: reqString,
    
})

const name = 'twitchRole'
export default mongoose.models[name] || mongoose.model(name, twitchroleSchema, name)

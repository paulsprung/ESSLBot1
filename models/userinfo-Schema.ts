import mongoose, { Schema } from "mongoose"

const reqString = {
    type: String,
    require: true
}
const reqInt = {
    type: Number,
    require: true,
}

const userinfoSchema = new Schema({
    _id: reqString,
    userName: reqString,
    channelname: reqString,
    channelsize: reqString,
    channelstatus: reqString,    
    roles: [{type: reqString}],
    leaderboardscore: reqInt,
    behaviorscore: reqInt,
    note: reqString,
})

const name = 'userinfoSchema'
export default mongoose.models[name] || mongoose.model(name, userinfoSchema, name)

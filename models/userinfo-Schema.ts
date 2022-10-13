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
    //Array mit Rollen
    //Reports
    //Anmerkung
})

const name = 'guildinfo'
export default mongoose.models[name] || mongoose.model(name, guildinfoSchema, name)

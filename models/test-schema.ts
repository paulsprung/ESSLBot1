import mongoose, { Schema } from "mongoose"

const testSchema = new Schema({
    message:{
        type: String,
        required: true,
    }
})

const name = 'test'
export default mongoose.models[name] || mongoose.model(name, testSchema, name)

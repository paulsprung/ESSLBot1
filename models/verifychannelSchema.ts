import mongoose, { Schema } from 'mongoose';

const reqString = {
    type: String,
    require: true,
};

const verifychannelSchema = new Schema({
    //Guild ID
    _id: reqString,
    roleId: reqString,
    channelId: reqString,
});

const name = 'Verifychannel';
export default mongoose.models[name] ||
    mongoose.model(name, verifychannelSchema, name);

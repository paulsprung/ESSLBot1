import mongoose, { Schema } from 'mongoose';

const reqString = {
    type: String,
    require: true,
};

const tempchannelSchema = new Schema({
    _id: reqString,
    channelId: reqString,
    categoryId: reqString,
    ownerId: reqString,
});

const name = 'VCChannelInfo';
export default mongoose.models[name] ||
    mongoose.model(name, tempchannelSchema, name);

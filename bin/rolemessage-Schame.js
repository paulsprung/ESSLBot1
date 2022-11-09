"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reqString = {
    type: String,
    required: true,
};
const schema = new mongoose_1.default.Schema({
    _id: reqString,
    channelId: reqString,
    messageId: reqString,
});
const name = 'button-roles';
exports.default = mongoose_1.default.models[name] || mongoose_1.default.model(name, schema, name);

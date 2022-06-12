"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'Testing',
    description: 'Replies with pong',
    slash: true,
    //testOnly: true,
    callback: ({}) => {
        return 'Pong';
    },
};

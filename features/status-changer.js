"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = (client) => {
    const statusOptions = [
        'Bot in Development',
        '<3',
        'not Active in Testing phase',
    ];
    let counter = 0;
    const updateStatus = () => {
        var _a;
        (_a = client.user) === null || _a === void 0 ? void 0 : _a.setPresence({
            status: 'idle',
            activities: [{
                    name: statusOptions[counter]
                }]
        });
        if (++counter >= statusOptions.length) {
            counter = 0;
        }
        setTimeout(updateStatus, 1000 * 60 * 5);
    };
    updateStatus();
};
exports.config = {
    dbName: 'STATUS_CHANGER',
    displayName: 'Status Changer'
};

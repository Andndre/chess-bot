"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onReady = void 0;
const Commands_1 = require("../Commands");
const onReady = async (client) => {
    if (!client.user || !client.application) {
        return;
    }
    await client.application.commands.set(Commands_1.Commands);
    client.user.setPresence({
        activities: [{ name: 'Under development', type: 0 }],
    });
    console.log(`${client.user.username} is online`);
};
exports.onReady = onReady;

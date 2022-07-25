"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onMessage = void 0;
const PlayWith_prefix_command_1 = require("../commands/prefix/PlayWith.prefix.command");
const onMessage = async (message) => {
    const PREFIX = 'chdev';
    if (message.content.startsWith(PREFIX)) {
        const command = message.content
            .substring(PREFIX.length)
            .trim()
            .split(' ')[0];
        switch (command) {
            case 'playwith':
                await (0, PlayWith_prefix_command_1.PlayWith_Prefix)(message);
                return;
        }
    }
};
exports.onMessage = onMessage;

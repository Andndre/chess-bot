"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ping_Slash = void 0;
exports.Ping_Slash = {
    name: 'ping',
    description: 'View the latency of the bot',
    type: 'CHAT_INPUT',
    run: async (_client, interaction) => {
        const startTime = Date.now();
        await interaction.followUp({
            content: '...',
        });
        const endTime = Date.now();
        interaction.editReply({
            content: 'Pong! \n' + (endTime - startTime) + 'ms',
        });
    },
};

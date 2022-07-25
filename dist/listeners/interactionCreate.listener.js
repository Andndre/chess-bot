"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onInteractionCreate = void 0;
const Commands_1 = require("../Commands");
const onInteractionCreate = async (client, interaction) => {
    if (interaction.isCommand() || interaction.isContextMenu()) {
        await handleSlashCommand(client, interaction);
    }
};
exports.onInteractionCreate = onInteractionCreate;
const handleSlashCommand = async (client, interaction) => {
    const slashCommand = Commands_1.Commands.find((c) => c.name === interaction.commandName);
    if (!slashCommand) {
        interaction.followUp({ content: 'An error has occurred' });
        return;
    }
    await interaction.deferReply();
    slashCommand.run(client, interaction);
};

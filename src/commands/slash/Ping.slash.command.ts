import { BaseCommandInteraction, Client, Interaction } from 'discord.js';
import { Command as SlashCommand } from '../../Command';

export const Ping_Slash: SlashCommand = {
	name: 'ping',
	description: 'Returns a greeting',
	type: 'CHAT_INPUT',
	run: async (_client: Client, interaction: BaseCommandInteraction) => {
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

import { Client } from 'discord.js';
import { Commands } from '../Commands';

export const onReady = async (client: Client) => {
	if (!client.user || !client.application) {
		return;
	}

	await client.application.commands.set(Commands);
	client.user.setPresence({
		activities: [{ name: 'Under development', type: 0 }],
	});

	console.log(`${client.user.username} is online`);
};

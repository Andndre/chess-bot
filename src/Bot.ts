import * as dotenv from 'dotenv';
dotenv.config();

import { Client, Intents, Interaction } from 'discord.js';
import { onReady } from './listeners/ready.listener';
import { onInteractionCreate } from './listeners/interactionCreate.listener';
import { onMessage } from './listeners/message.listener';

console.log('Bot is starting...');

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', onReady);
// For slash commands
client.on('interactionCreate', (interaction: Interaction) =>
	onInteractionCreate(client, interaction)
);

client.on('message', onMessage);

client.login(process.env.BOT_TOKEN);

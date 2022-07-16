import { Message } from 'discord.js';

export const Hello_Prefix = async (message: Message) => {
	await message.reply('Hello, ' + message.author.toString() + '!');
};

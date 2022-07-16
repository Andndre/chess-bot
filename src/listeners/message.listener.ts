import { Message } from 'discord.js';
import { Hello_Prefix } from '../commands/prefix/Hello.prefix.command';

export const onMessage = async (message: Message) => {
	const PREFIX = 'ch';
	if (message.content.startsWith(PREFIX)) {
		// get the command name
		const command = message.content
			.substring(PREFIX.length)
			.trim()
			.split(' ')[0];
		// execute the command
		switch (command) {
			case 'hello':
				await Hello_Prefix(message);
		}
	}
};

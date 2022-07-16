import { Message } from 'discord.js';
import { PlayWith_Prefix } from '../commands/prefix/PlayWith.prefix.command';

export const onMessage = async (message: Message) => {
	const PREFIX = 'ch';
	if (message.content.startsWith(PREFIX)) {
		// get the command name
		const command = message.content
			.substring(PREFIX.length)
			// allow space after PREFIX (ex: `ch command`)
			.trim()
			.split(' ')[0];
		// execute the command
		switch (command) {
			case 'playwith':
				await PlayWith_Prefix(message);
				return;
		}
	}
};

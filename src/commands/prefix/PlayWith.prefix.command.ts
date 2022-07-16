import { Message, MessageActionRow, MessageButton } from 'discord.js';
import { lastElement } from '../../Utils';

export const PlayWith_Prefix = async (message: Message) => {
	const playerOne = message.author.toString();
	const playerTwo = lastElement(message.content.split(' '));
	const row = new MessageActionRow();
	const button = new MessageButton()
		.setLabel('Go to the game')
		.setURL('https://andndre.github.io/chess')
		.setStyle('LINK');
	row.addComponents(button);
	await message.reply({
		content: `${playerOne} vs ${playerTwo} !`,
		components: [row],
	});
};

import { Message, MessageActionRow, MessageButton } from 'discord.js';
import { getUID, lastElement } from '../../Utils';

export const PlayWith_Prefix = async (message: Message) => {
	const playerOne = message.author.toString();
	const playerTwo = lastElement(message.content.split(' '));
	const row = new MessageActionRow();
	const gameLinkInfo = await message.reply(
		'Sending game link for each players...'
	);
	const p1UID = getUID(playerOne);
	const p2UID = getUID(playerTwo);
	const gameLink =
		'https://andndre.github.io/chess/play?gameId=' + p1UID + p2UID + '&as=';
	await message.author.send('Go to ' + gameLink + p1UID);
	await message.client.users.cache
		.get(p2UID)!
		.send('Go to ' + gameLink + p2UID);
	const button = new MessageButton()
		.setLabel('Go watch!')
		.setURL('https://andndre.github.io/chess/watch?gameId=' + p1UID + p2UID)
		.setStyle('LINK');
	row.addComponents(button);
	await gameLinkInfo.edit({
		content: `${playerOne} vs ${playerTwo} !`,
		components: [row],
	});
};

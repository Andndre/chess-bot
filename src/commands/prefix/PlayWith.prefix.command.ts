import { Message, MessageActionRow, MessageButton } from 'discord.js';
import { getUID, lastElement } from '../../Utils';
import fetch from 'cross-fetch';

export const PlayWith_Prefix = async (message: Message) => {
	const playerOne = message.author.toString();
	const playerTwo = lastElement(message.content.split(' '));
	const row = new MessageActionRow();
	const gameLinkInfo = await message.reply(
		'Sending game link for each players...'
	);
	const res = await fetch('https://chess-web-production.up.railway.app/create');
	const json = await res.json();
	const gameId = json.gameId;
	const whiteKey = json.whiteId;
	const blackKey = json.blackId;
	const watchKey = json.watchKey;
	const p2UID = getUID(playerTwo);
	const gameLink =
		'https://chess-web-ten.vercel.app/online?gameId=' + gameId + '&roleKey=';
	await message.author.send('Go to ' + gameLink + whiteKey);
	await message.client.users.cache
		.get(p2UID)!
		.send('Go to ' + gameLink + blackKey);
	const button = new MessageButton()
		.setLabel('Go watch!')
		.setURL(gameLink + watchKey)
		.setStyle('LINK');
	row.addComponents(button);
	await gameLinkInfo.edit({
		content: `${playerOne} vs ${playerTwo} !`,
		components: [row],
	});
};

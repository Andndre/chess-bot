import { Message, MessageActionRow, MessageButton } from 'discord.js';
import { getUID, lastElement } from '../../Utils';
import fetch from 'cross-fetch';

export const PlayWith_Prefix = async (message: Message) => {
	const playerOne = message.author.toString();
	const playerTwo = lastElement(message.content.split(' '));
	const gameLinkInfo = await message.reply(
		'Sending game link for each players...'
	);
	const res = await fetch('https://chess-web-production.up.railway.app/create');
	// const res = await fetch('http://localhost:3333/create');
	const json = await res.json();

	const gameId = json.gameId;
	const whiteKey = json.whiteId;
	const blackKey = json.blackId;
	const watchKey = json.watchKey;

	const p2UID = getUID(playerTwo);

	const gameLink =
		'https://chess-web-ten.vercel.app/online?gameId=' + gameId + '&roleKey=';
	// 'http://localhost:3000/online?gameId=' + gameId + '&roleKey=';

	const rowForWhite = new MessageActionRow();
	const buttonForWhite = new MessageButton()
		.setLabel('Play')
		.setURL(gameLink + whiteKey)
		.setStyle('LINK');
	rowForWhite.addComponents(buttonForWhite);

	const content =
		'Here is your game link!.. \n\n**Do not**\n- share it with anybody, or else you will not be able to enter the game.\n- leave the game while playing, or else the game automatically ends.\n\nIf none of you click this link for 3 minutes, the game will be deleted.';

	await message.author.send({
		content,
		components: [rowForWhite],
	});

	const rowForBlack = new MessageActionRow();
	const buttonForBlack = new MessageButton()
		.setLabel('Play')
		.setURL(gameLink + blackKey)
		.setStyle('LINK');
	rowForBlack.addComponents(buttonForBlack);

	await message.client.users.cache.get(p2UID)!.send({
		content:
			'You just invited by `@' +
			message.author.username +
			'` to play chess with them..\n\n' +
			content,
		components: [rowForBlack],
	});

	const button = new MessageButton()
		.setLabel('Go watch!')
		.setURL(gameLink + watchKey)
		.setStyle('LINK');

	const row = new MessageActionRow();
	row.addComponents(button);

	await gameLinkInfo.edit({
		content: `${playerOne} vs ${playerTwo} !`,
		components: [row],
	});
};

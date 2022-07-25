"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayWith_Prefix = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const Utils_1 = require("../../Utils");
const cross_fetch_1 = tslib_1.__importDefault(require("cross-fetch"));
const PlayWith_Prefix = async (message) => {
    const playerOne = message.author.toString();
    const playerTwo = (0, Utils_1.lastElement)(message.content.split(' '));
    const gameLinkInfo = await message.reply('Sending game link for each players...');
    const res = await (0, cross_fetch_1.default)('http://localhost:3333/create');
    const json = await res.json();
    const gameId = json.gameId;
    const whiteKey = json.whiteId;
    const blackKey = json.blackId;
    const watchKey = json.watchKey;
    const p2UID = (0, Utils_1.getUID)(playerTwo);
    const gameLink = 'http://localhost:3000/online?gameId=' + gameId + '&roleKey=';
    const rowForWhite = new discord_js_1.MessageActionRow();
    const buttonForWhite = new discord_js_1.MessageButton()
        .setLabel('Play')
        .setURL(gameLink + whiteKey)
        .setStyle('LINK');
    rowForWhite.addComponents(buttonForWhite);
    const content = 'Here is your game link!.. \n\n**Do not**\n- Share it with anybody, or else you will not be able to enter the game.\n- Leave the game while playing, or else the game automatically ends.';
    await message.author.send({
        content,
        components: [rowForWhite],
    });
    const rowForBlack = new discord_js_1.MessageActionRow();
    const buttonForBlack = new discord_js_1.MessageButton()
        .setLabel('Play')
        .setURL(gameLink + blackKey)
        .setStyle('LINK');
    rowForBlack.addComponents(buttonForBlack);
    await message.client.users.cache.get(p2UID).send({
        content: 'You just invited by @' +
            message.author.username +
            ' to play chess with them..\n\n' +
            content,
        components: [rowForBlack],
    });
    const button = new discord_js_1.MessageButton()
        .setLabel('Go watch!')
        .setURL(gameLink + watchKey)
        .setStyle('LINK');
    const row = new discord_js_1.MessageActionRow();
    row.addComponents(button);
    await gameLinkInfo.edit({
        content: `${playerOne} vs ${playerTwo} !`,
        components: [row],
    });
};
exports.PlayWith_Prefix = PlayWith_Prefix;

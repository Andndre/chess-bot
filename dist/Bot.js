"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv = tslib_1.__importStar(require("dotenv"));
dotenv.config();
const discord_js_1 = require("discord.js");
const ready_listener_1 = require("./listeners/ready.listener");
const interactionCreate_listener_1 = require("./listeners/interactionCreate.listener");
const message_listener_1 = require("./listeners/message.listener");
console.log('Bot is starting...');
const client = new discord_js_1.Client({
    intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES],
});
client.on('ready', ready_listener_1.onReady);
client.on('interactionCreate', (interaction) => (0, interactionCreate_listener_1.onInteractionCreate)(client, interaction));
client.on('messageCreate', message_listener_1.onMessage);
client.login(process.env.BOT_TOKEN);

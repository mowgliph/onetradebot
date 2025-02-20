import TelegramBot from 'node-telegram-bot-api';
import { TELEGRAM_BOT_TOKEN } from "./config/env.js";

const TOKEN = TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(TOKEN);

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 
        `🤖 ¡Hola ${msg.from.first_name}! Bienvenido a OneTradeBot. 🚀`
    );
});

console.log("✅ OneTradeBot está en línea...");
// Comando /p para obtener precio
import { getPrice } from "../models/api.js";

export async function handlePrice(bot, chatId, symbol) {
    const price = await getPrice(symbol);

    if (typeof price === "string") {
        bot.sendMessage(chatId, `⚠️ ${price}`);
    } else {
        bot.sendMessage(chatId, `💰 Precio actual de *${symbol.toUpperCase()}*: $${price}`);
    }
}
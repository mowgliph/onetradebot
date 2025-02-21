// Comando /balance
import { getBalance } from "../models/api.js";

export async function handleBalance(bot, chatId) {
    const balance = await getBalance();

    if (typeof balance === "string") {
        bot.sendMessage(chatId, `⚠️ ${balance}`);
    } else {
        let message = "💰 *Balance de la cuenta:*\n";
        for (const [coin, info] of Object.entries(balance)) {
            if (parseFloat(info.available) > 0) {
                message += `🔹 ${coin}: ${info.available} disponible\n`;
            }
        }
        bot.sendMessage(chatId, message, { parse_mode: "Markdown" });
    }
}
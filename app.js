import TelegramBot from 'node-telegram-bot-api';
import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHANNEL_ID } from "./config/env.js";
import { handlePrice } from "./commands/price.js";
import { handleBalance } from "./commands/balance.js";
import { isUserSubscribed } from "./middlewares/checkSubscription.js";

const TOKEN = TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(TOKEN, {polling: true});

// Message Start
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const name = msg.from.first_name || "Trader";

    const isSubscribed = await isUserSubscribed(userId, TELEGRAM_CHANNEL_ID);

    if (!isSubscribed){
        bot.sendMessage(chatId, 
            `🚨 Para usar el bot, debes unirte al canal oficial: [OneTradeBot Channel](https://t.me/onetradebot_channel)`, {
            parse_mode: "Markdown",
            disable_web_page_preview: true
        });
        return;
    }

    const welcomeMessage = `
🤖 ¡Hola, ${name}! Bienvenido a **OneTradeBot** 🚀  

🔹 **¿Qué es OneTradeBot?**  
OneTradeBot es un asistente automatizado que permite realizar operaciones de trading en **CoinEx** directamente desde **Telegram**.  

⚡ **Características**:  
✔️ Consulta el precio de criptomonedas en tiempo real.  
✔️ Obtén capturas de gráficos de pares de trading.  
✔️ Abre y cierra posiciones en **Long** y **Short** con apalancamiento.  
✔️ Administra tu **Take Profit (TP)** y **Stop Loss (SL)**.  
✔️ Consulta el saldo de tu cuenta en **Spot** y **Futures**.  

👉 Para más detalles, usa el comando /help  
    `;

    bot.sendMessage(chatId, welcomeMessage, { parse_mode: "Markdown" });
});

// Intercept all msg
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    if (msg.text.startsWith('/')) {
        const isSubscribed = await isUserSubscribed(userId, TELEGRAM_CHANNEL_ID);

        if (!isSubscribed) {
            bot.sendMessage(chatId, `⚠️ Necesitas estar suscrito al canal antes de usar los comandos: [OneTradeBot Channel](https://t.me/onetradebot_channel)`, {
                parse_mode: "Markdown",
                disable_web_page_preview: true
            });
            return;
        }
    }
});


// Message Help
bot.onText(/\/help/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    const isSubscribed = await isUserSubscribed(userId, TELEGRAM_CHANNEL_ID);

    if (!isSubscribed){
        bot.sendMessage(chatId, 
            `🚨 Para usar el bot, debes unirte al canal oficial: [OneTradeBot Channel](https://t.me/onetradebot_channel)`, {
            parse_mode: "Markdown",
            disable_web_page_preview: true
        });
        return;
    }

    const helpMessage = `
📌 **OneTradeBot - Guía de Uso**  

✅ **Lista de Comandos**  

🔹 \`/p [moneda]\` → Muestra el precio actual de cualquier criptomoneda.  
🔹 \`/c [moneda1] [moneda2] [temporalidad]\` → Captura gráfica del par de trading.  
🔹 \`/long [moneda1] [moneda2] [apalancamiento] [monto]\` → Abre operación **Long**.  
🔹 \`/short [moneda1] [moneda2] [apalancamiento] [monto]\` → Abre operación **Short**.  
🔹 \`/tp\` → Configura **Take Profit (TP)** de una operación.  
🔹 \`/sl\` → Configura **Stop Loss (SL)** de una operación.  
🔹 \`/balance\` → Muestra el balance de la cuenta (Spot/Futures).  

📖 **Guía completa:** [🔗 Click aquí](https://telegra.ph/OneTradeBot---Gu%C3%ADa-de-Uso-02-21)  
    `;

    bot.sendMessage(chatId, helpMessage, { parse_mode: "Markdown", disable_web_page_preview: true });
});

// 📌 Comando "/p [moneda]"
bot.onText(/\/p (.+)/, (msg, match) => {
    handlePrice(bot, msg.chat.id, match[1]);
});

// 📌 Comando "/balance"
bot.onText(/\/balance/, (msg) => {
    handleBalance(bot, msg.chat.id);
});

// Show Message on Terminal
console.log("✅ OneTradeBot está en línea...");
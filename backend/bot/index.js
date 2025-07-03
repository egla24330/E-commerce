// bot/index.js

import TelegramBot from 'node-telegram-bot-api';
import path from 'path';
import { fileURLToPath } from 'url';

// Support for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Start the Telegram bot
function startBot() {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    console.error("❌ TELEGRAM_BOT_TOKEN is not set in environment variables.");
    return;
  }

  const bot = new TelegramBot(token, { polling: true });

  // Handle incoming "/start" command
  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const user = msg.from?.first_name || "there";

    try {
      // 1️⃣ Send welcome image with caption
      const imagePath = path.join(__dirname, 'assets', 'welcome.jpg') || 'https://www.zaycommerce.com/logo.png'

      await bot.sendPhoto(chatId, imagePath, {
        caption: `👋 Welcome to *ZayCommerce*, ${user}!\nYour gateway to reliable shopping.`,
        parse_mode: 'Markdown',
      });

      // 2️⃣ Send Telegram Web App button
      const keyboard = {
        keyboard: [[
          {
            text: "🛒 Open ZayCommerce",
            web_app: {
              url: "https://zaycommerce.com", // Replace with your live domain
            },
          },
        ]],
        resize_keyboard: true,
        one_time_keyboard: true,
      };

      await bot.sendMessage(chatId, `👇 Tap below to launch the app inside Telegram:`, {
        reply_markup: keyboard,
      });

      console.log(`📩 Sent start message to user: ${user} (${chatId})`);

    } catch (err) {
      console.error("❌ Error handling /start command:", err);
      await bot.sendMessage(chatId, "⚠️ Something went wrong. Please try again later.");
    }
  });

  // Handle polling errors
  bot.on("polling_error", (err) => {
    console.error("📡 Polling Error:", err?.response?.body || err.message || err);
  });

  console.log("🤖 Telegram Bot is running and ready.");
}

export default startBot;

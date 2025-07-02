import TelegramBot from 'node-telegram-bot-api';
import path from 'path';

function startBot() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const bot = new TelegramBot(token, { polling: true });

  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const user = msg.from?.first_name || "there";

    const imagePath = path.join(__dirname, 'assets', 'welcome.jpg');
    await bot.sendPhoto(chatId, imagePath, {
      caption: `👋 Welcome to *ZayCommerce*, ${user}!`,
      parse_mode: 'Markdown'
    });

    const keyboard = {
      keyboard: [[{
        text: "🛒 Open ZayCommerce",
        web_app: { url: "https://zaycommerce.com" }
      }]],
      resize_keyboard: true,
      one_time_keyboard: true
    };

    await bot.sendMessage(chatId, "👇 Tap below to launch the app:", {
      reply_markup: keyboard
    });
  });

  console.log("🤖 Telegram Bot is running");
}

export default startBot;

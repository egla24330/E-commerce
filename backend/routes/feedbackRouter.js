import axios from 'axios';
import express from 'express';

const FeedbackRouter = express.Router();

const botToken = '8104420367:AAGaW20GFPrjYTiYzXAIHjIL955UfCq2izI';
const chatIds = [6804194223];

async function sendTelegramAlert({ name, email, message, rating }) {
    const telegramMessage = `⭐️ *New Feedback Received!*\n\n` +
        `👤 *Name*: ${name}\n\n` +
        `📧 *Email*: ${email}\n\n` +
        `💬 *Message*: ${message}\n\n` +
        `🌟 *Rating*: ${rating} / 5\n\n` +
        `🕒 _Submitted just now._`;

    const url = `https://api.telegram.org/bot${process.env.T_V}/sendMessage`;

    for (const chatId of chatIds) {
        try {
            await axios.post(url, {
                chat_id: chatId,
                text: telegramMessage,
                parse_mode: 'Markdown'
            });
        } catch (error) {
            console.error(`❌ Failed to send message to chatId ${chatId}:`, error.message);
        }
    }
}

FeedbackRouter.post('/feedback', async (req, res) => {
    const { name, email, message, rating } = req.body;

    if (!name || !email || !message || !rating) {
        return res.status(400).json({ error: 'All fields are required: name, email, message, rating.' });
    }

    try {
        await sendTelegramAlert({ name, email, message, rating });
        res.json({ message: '✅ Feedback sent successfully!' });
    } catch (error) {
        console.error('❌ Failed to send feedback:', error.message);
        res.status(500).json({ error: 'Failed to send feedback.' });
    }
});

export default FeedbackRouter;

import axios from 'axios';
import withdrawalModel from "../models/withdrawalModel.js";
import userModel from "../models/userModel.js";

// ✅ Telegram Setup
const botToken = process.env.T_W
const chatIds = [6804194223];

async function sendTelegramWithdrawalAlert({ name, phone, bankAccount, leftDeposite, withdrawalAmount }) {
    const message = `💸 *New Withdrawal Request!*\n\n` +
        `👤 *Name:* ${name}\n\n` +
        `📞 *Phone:* ${phone}\n\n` +
        `🏦 *Bank Account:* ${bankAccount}\n\n` +
        `💰 *Current Balance:* ${leftDeposite}\n\n` +
        `💵 *Requested Amount:* ${withdrawalAmount}\n\n` +
        `🕒 _Submitted just now._`;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    for (const chatId of chatIds) {
        try {
            await axios.post(url, {
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown'
            });
        } catch (error) {
            console.error(`❌ Failed to send Telegram alert to chatId ${chatId}:`, error.message);
        }
    }
}

// ✅ Create a new withdrawal request
export const createWithdrawal = async (req, res) => {
    try {
        const { name, phone, bankAccount, leftDeposite, withdrawalAmount, userId } = req.body;

        if (!name || !phone || !bankAccount || !leftDeposite || !withdrawalAmount || !userId) {
            return res.status(400).json({ message: '❌ Missing required fields.' });
        }

        const newWithdrawal = new withdrawalModel({
            name,
            phone,
            bankAccount,
            leftDeposite,
            withdrawalAmount,
            userId
        });

        await newWithdrawal.save();
        await sendTelegramWithdrawalAlert({ name, phone, bankAccount, leftDeposite, withdrawalAmount });

        res.json({ success: true, message: '✅ Withdrawal request created successfully.' });
    } catch (error) {
        console.error('❌ Error creating withdrawal:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// ✅ Update user coin
export const updateCoin = async (req, res) => {
    try {
        const { userId, coin } = req.body;

        if (!userId || !coin) {
            return res.status(400).json({ success: false, message: '❌ Missing required fields.' });
        }

        const withdrawal = await userModel.findOneAndUpdate(
            { _id: userId },
            { coins: coin },
            { new: true }
        );

        if (!withdrawal) {
            return res.status(404).json({ success: false, message: '❌ User not found.' });
        }

        res.json({ success: true, message: '✅ Coin updated successfully.', withdrawal });
    } catch (error) {
        console.error('❌ Error updating coin:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// ✅ Get all withdrawals (admin)
export const getAllWithdrawals = async (req, res) => {
    try {
        const withdrawals = await withdrawalModel.find({});
        res.json({ success: true, withdrawals });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// ✅ Delete withdrawal
export const deleteWithdrawal = async (req, res) => {
    try {
        const { id } = req.params;
        const withdrawal = await withdrawalModel.findByIdAndDelete(id);

        if (!withdrawal) {
            return res.status(404).json({ success: false, message: '❌ Withdrawal not found.' });
        }

        res.json({ success: true, message: '✅ Withdrawal deleted successfully.' });
    } catch (error) {
        console.error('❌ Error deleting withdrawal:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

//import withdrawal from '../models/withdrawal.js';

import withdrawalModel from "../models/withdrawalModel.js";
import userModel from "../models/userModel.js";
// Create a new withdrawal request
export const createWithdrawal = async (req, res) => {
    try {
       
        const {name,phone,bankAccount,leftDeposite,withdrawalAmount,userId } = req.body;
        console.log(req.body);
        if (!name || !phone || !bankAccount || !leftDeposite || !withdrawalAmount || !userId) {
            return res.status(400).json({ message: 'Missing required fields.' });
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
        res.json({success:true,message: 'Withdrawal request created successfully.'});
        
    
    } catch (error) {
        console.error('Error creating withdrawal:', error);
        res.status(500).json({success:false, message: 'Server error.'});
    }
};

export const updateCoin = async (req, res) => {
    try {
        const { userId, coin } = req.body;
        console.log(req.body);
        if (!userId || !coin) {     
            return res.status(400).json({success:false, message: 'Missing required fields.' });
        }

        const withdrawal = await userModel.findOneAndUpdate(
            { _id:userId },
            { coins:coin },
            { new: true }
        );

        if (!withdrawal) {
            return res.status(404).json({success:false, message: 'Withdrawal not found.' });
        }
          console.log(withdrawal);
        res.json({ success: true, message: 'Coin updated successfully.', withdrawal });
    } catch (error) {
        console.error('Error updating coin:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
}




// Get all withdrawals (admin)
export const getAllWithdrawals = async (req, res) => {
    try {
        const withdrawals = await withdrawalModel.find({})
        res.json({ success: true,withdrawals });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};


export const deleteWithdrawal = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('ID to delete:', id);
        const withdrawal = await withdrawalModel.findByIdAndDelete(id);

        if (!withdrawal) {
            return res.status(404).json({ success: false, message: 'Withdrawal not found.' });
        }

        res.json({ success: true, message: 'Withdrawal deleted successfully.' });
    } catch (error) {
        console.error('Error deleting withdrawal:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
}
/*

// Get withdrawals for a specific user
export const getUserWithdrawals = async (req, res) => {
    try {
        const { userId } = req.params;
        const withdrawals = await Withdrawal.find({ user: userId });
        res.json(withdrawals);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// Update withdrawal status (approve/reject)
export const updateWithdrawalStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status.' });
        }

        const withdrawal = await Withdrawal.findByIdAndUpdate(
            id,
            { status, processedAt: new Date() },
            { new: true }
        );

        if (!withdrawal) {
            return res.status(404).json({ message: 'Withdrawal not found.' });
        }

        res.json({ message: 'Withdrawal status updated.', withdrawal });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }

};
*/
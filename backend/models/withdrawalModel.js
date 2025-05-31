import mongoose from 'mongoose';
// The following schema defines the Withdrawal model.
// Fields marked as 'required: [true, "<message>"]' must be provided when creating a document.
// If a required field is missing, the specified message will be shown.

const withdrawalSchema = new mongoose.Schema({
    withdrawalAmount: { // Required: The amount to withdraw
        type: Number,
        required: [true, 'Withdrawal amount is required']
    },
    bankAccount: { // Required: The bank account to withdraw to
        type: String,
        required: [true, 'Bank account is required']
    },
    name: { // Optional: Name of the account holder (defaults to empty string if not provided)
        type: String,
        default: ''
    },
    userId: { // Required: The user making the withdrawal
        type: String,
        required: [true, 'User ID is required']
    },
    phone: { // Required: Contact phone number
        type: String,
        required: [true, 'Phone number is required']
    },
    leftDeposite: { // Required: Remaining deposit after withdrawal
        type: Number,
        required: [true, 'Left deposit is required']
    }
}, { timestamps: true });


const withdrawalModel =mongoose.model.Withdrawal || mongoose.model('Withdrawal', withdrawalSchema);
export default withdrawalModel
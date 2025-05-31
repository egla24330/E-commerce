import mongoose from 'mongoose';
const ContactMessageSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String,
  },
  { timestamps: true }
);
export default mongoose.model('ContactMessage', ContactMessageSchema);

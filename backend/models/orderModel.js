import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema({
  customerInfo: {
    name: String,
    email: String,
    phone: String,
    city: String,
    deliveryArea:String,
    subCity:String,
    address: String,
    deliveryLocation:String
   // zip: String,
  },
  cart: {type:Array},
  totalPrice: Number,
  userId:String,
  paymentMethod:String,
  orderShi:{type:String,default:'order placed'},
  receiptUrl: String,
  userId:String,
  status: {
    type: String,
    enum: ["pending_verification", "paid", "rejected"],
    default: "pending_verification",
  },
  referralRewarded: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);
export default orderModel;

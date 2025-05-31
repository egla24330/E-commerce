
/**
 * User Schema for MongoDB using Mongoose.
 * Represents a user in the E-commerce application.
 * 
 * Fields:
 * - googleId (String): Optional. Unique identifier for users authenticated via Google.
 * - name (String): Required. The name of the user.
 * - email (String): Required. Unique email address of the user.
 * - avatar (String): Optional. URL of the user's avatar image.
 * - password (String): Optional. Hashed password for users who sign up manually.
 * - role (String): User's role in the system. Can be "user" or "admin". Defaults to "user".
 * 
 * Timestamps:
 * - createdAt: Automatically generated timestamp when the document is created.
 * - updatedAt: Automatically generated timestamp when the document is updated.
 * 
 * Middleware:
 * - Pre-save hook: Automatically hashes the password using bcrypt if it exists and is modified.
 * 
 * Model:
 * - Exports the Mongoose model for the user schema. If the model already exists, it reuses it.
 */
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, unique: true, sparse: true }, // optional
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    password: { type: String }, // optional, only for manual signup
    role: { type: String, enum: ["user", "admin"], default: "user" },
    referralCode: { type: String, unique: true },
    referredBy: { type: String, default: null },
    referralRewards: [{
      buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }
    }],
    coins: { type: Number, default: 5 }

  },
  { timestamps: true }
);

const userModel = mongoose.models.user || mongoose.model('user', userSchema);
export default userModel;



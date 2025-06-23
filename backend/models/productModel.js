import mongoose from "mongoose";
/*const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: Array, required: true },
  bestseller: { type: Boolean, default: false },
  date: { type: Number, required: true },
});*/

//const variantSchema = new mongoose.Schema({
  //label: { type: String },           // e.g., Size, Color, Format
  //values: [String],                  // e.g., ["M", "L"], ["Red", "Blue"]
//}, { _id: false });

const variantValueSchema = new mongoose.Schema({
  value: { type: String, required: true },
  price: { type: Number, default: 0 } // price added *on top of* base price
}, { _id: false });

const variantSchema = new mongoose.Schema({
  label: { type: String, required: true }, // e.g., Size, Color
  values: [variantValueSchema]
}, { _id: false });

const reviewSchema = new mongoose.Schema({
 // userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // for SEO-friendly URL
  category: {
    type: String,
    required: true,
    enum: [
      "Electronics & Accessories",
      "Clothing & Fashion",
      "Books & Education",
      "Construction Materials",
      "Real Estate & Guest Houses",
      "Health & Beauty",
      "Baby & Kids",
      "Automotive Supplies",
      "Furniture & Home Decor",
      "Household Essentials"
    ]
  },
  description: { type: String },
  price: { type: Number, required: true },
  images: [String], // Cloudinary URLs
  variants: [variantSchema], // For sizes, colors, etc.
  stock: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  tags: [String], // For keyword search
  rating: { type: Number, default: 0 },
  profit: { type: Number, default: 0 }, // Profit margin
  reviews: [reviewSchema],
  createdAt: { type: Date, default: Date.now }
});
const productModel = mongoose.models.product || mongoose.model("product", productSchema);
export default productModel;
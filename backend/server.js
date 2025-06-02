import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectToMongoDB from './configs/mongodb.js';
import connectCloudinary from './configs/cloudinary.js';
import cors from 'cors';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRouter.js';
import orderRouter from './routes/orderRouter.js';
import contactRouter from './routes/contactRoute.js';
import withdrawalRouter from './routes/withdrawalRoute.js';
import p from 'path';
import { fileURLToPath } from 'url';
import history from 'connect-history-api-fallback';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = p.dirname(__filename);

//console.log( __filename)
//console.log( __dirname)
// Load environment variables first
dotenv.config({ path: './config.env' });

const app = express();

// Connect to MongoDB and Cloudinary
connectToMongoDB();
connectCloudinary();

// Middleware
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(express.static('public'));

// API Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/withdrawal', withdrawalRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/message', contactRouter);

// Health check
app.get('/', (req, res) => {
  res.send('API is working');
});





app.use((err, req, res, next) => {
  console.error('Unexpected error:', err);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Add after API routes, before static serving
app.use(history());

// Then serve static files
app.use(express.static(p.join(__dirname, 'dist')));


// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running at http://0.0.0.0:${PORT}`);
});

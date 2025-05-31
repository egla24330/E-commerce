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

// Load environment variables first
dotenv.config({ path: './config.env' });

const app = express();

// Connect to databases
connectToMongoDB();
connectCloudinary();

// Middleware
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/withdrawal', withdrawalRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/message', contactRouter);

// Health check route
app.get('/', (req, res) => {
  res.send('API is working 🚀');
});

// Start server (PORT from environment)
const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running at http://0.0.0.0:${PORT}`);
});

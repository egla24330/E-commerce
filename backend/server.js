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

import history from 'connect-history-api-fallback';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname workaround for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: './config.env' });

const app = express();

// Connect to database and cloudinary
connectToMongoDB();
connectCloudinary();

// Middleware
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// API routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/withdrawal', withdrawalRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/message', contactRouter);

// Support SPA routing (must come before static)
app.use(history());

// Serve static files (built Vite app)
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all to serve index.html for unknown frontend routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unexpected error:', err);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

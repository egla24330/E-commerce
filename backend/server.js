import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import history from 'connect-history-api-fallback';
import { fileURLToPath } from 'url';

import connectToMongoDB from './configs/mongodb.js';
import connectCloudinary from './configs/cloudinary.js';

import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRouter.js';
import orderRouter from './routes/orderRouter.js';
import contactRouter from './routes/contactRoute.js';
import withdrawalRouter from './routes/withdrawalRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// ✅ Connect to services
connectToMongoDB();
connectCloudinary();

// ✅ Middleware
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// ✅ API Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/withdrawal', withdrawalRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/message', contactRouter);

/// ✅✅ IMPORTANT: Admin goes first
const adminPath = path.join(__dirname, 'admin-dist');

// Serve static admin files
app.use('/admin', express.static(adminPath));

// Handle admin refresh (history fallback)
app.use(
  '/admin',
  history({
    index: '/admin/index.html',
    rewrites: [{ from: /^\/admin\/.*$/, to: '/admin/index.html' }],
  })
);

// Serve static again after history
app.use('/admin', express.static(adminPath));

/// ✅✅ THEN Client goes after admin
const clientPath = path.join(__dirname, 'client-dist');

app.use('/', express.static(clientPath));

app.use(
  '/',
  history({
    index: '/index.html',
  })
);

app.use('/', express.static(clientPath));

// ✅ Error handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// ✅ Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import connectToMongoDB from './configs/mongodb.js';
import connectCloudinary from './configs/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRouter.js';
import orderRouter from './routes/orderRouter.js';
import contactRouter from './routes/contactRoute.js';
import withdrawalRouter from './routes/withdrawalRoute.js';
import history from 'connect-history-api-fallback';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: './config.env' });

const app = express();

// Connect DB and cloudinary
connectToMongoDB();
connectCloudinary();

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// API Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/withdrawal', withdrawalRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/message', contactRouter);




// Admin panel history + static
// Serve static files first
app.use('/admin', express.static(path.join(__dirname, 'admin-dist')));

// Then handle history fallback (for SPA route refreshes like /admin/orders)
app.use('/admin', history({
  index: '/admin/index.html',
  rewrites: [{ from: /^\/admin\/.*$/, to: '/admin/index.html' }],
}));



app.use('/', express.static(path.join(__dirname, 'dist')));
// Client SPA fallback
app.use('/', history({
  verbose: true,
  index: '/index.html',
  rewrites: [
    { from: /^\/(?!admin).*/, to: '/index.html' }
  ]
}));
app.use('/', express.static(path.join(__dirname, 'dist')));


// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});

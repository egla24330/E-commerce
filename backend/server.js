import express from 'express';
import path from 'path';
import history from 'connect-history-api-fallback';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';

import connectToMongoDB from './configs/mongodb.js';
import connectCloudinary from './configs/cloudinary.js';

import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRouter.js';
import orderRouter from './routes/orderRouter.js';
import contactRouter from './routes/contactRoute.js';
import withdrawalRouter from './routes/withdrawalRoute.js';
import chatbotRouter from './routes/chatbotRouter.js';
import FeedbackRouter from './routes/feedbackRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// ✅ Connect to DBs
connectToMongoDB();
connectCloudinary();

// ✅ Global Middleware
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// ✅ API Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/withdrawal', withdrawalRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/message', contactRouter);
app.use('/api/my-bot', chatbotRouter);
app.use('/api', FeedbackRouter);

// ===============================
// ✅ ADMIN SPA (Served at /admin)
// ===============================
const adminDistPath = path.join(__dirname, 'admin-dist');

// Serve static files first for /admin
app.use('/admin', express.static(adminDistPath));

// Then history fallback for /admin (after static)
app.use(
  '/admin',
  history({
    index: '/admin/index.html',
    verbose: true,
    rewrites: [
      { from: /^\/admin\/.*$/, to: '/admin/index.html' }
    ]
  })
);

// Re-serve static files after fallback for /admin
app.use('/admin', express.static(adminDistPath));

// ===============================
// ✅ CLIENT SPA (Served at / )
// ===============================
const clientDistPath = path.join(__dirname, 'client-dist');

// Serve static files first for /
app.use('/', express.static(clientDistPath));

// Then history fallback for / (after static)
app.use(
  '/',
  history({
    index: '/index.html',
    verbose: true,
  })
);

// Re-serve static files after fallback for /
app.use('/', express.static(clientDistPath));


// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// ✅ Start Server
const PORT = process.env.PORT || 4000; // Changed 000 to 4000 as a common default
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
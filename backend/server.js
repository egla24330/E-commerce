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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

connectToMongoDB();
connectCloudinary();

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// ==============================
// ✅ API ROUTES
// ==============================
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/withdrawal', withdrawalRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/message', contactRouter);
app.use('/api/my-bot',chatbotRouter)

// ==============================
// ✅ STATIC ADMIN
// ==============================
const adminPath = path.join(__dirname, 'admin-dist'); // or just 'dist' if that's your admin build folder

app.use('/admin', express.static(adminPath));

app.use(
  '/admin',
  history({
    index: '/admin/index.html',
    rewrites: [{ from: /^\/admin\/.*$/, to: '/admin/index.html' }],
  })
);

app.use('/admin', express.static(adminPath));

// ==============================
// ✅ STATIC CLIENT
// ==============================
const clientPath = path.join(__dirname, 'client-dist');

app.use('/', express.static(clientPath));

app.use(
  '/',
  history({
    index: '/index.html',
  })
);

app.use('/', express.static(clientPath));

// ==============================
// ✅ Error handler
// ==============================
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// ==============================
// ✅ START
// ==============================
const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

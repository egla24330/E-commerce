import express from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from './configs/mongodb.js';
import connectCloudinary from './configs/cloudinary.js';
import cors from 'cors';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRouter.js';
import orderRouter from './routes/orderRouter.js';
import contactRouter from './routes/contactRoute.js';
import withdrawalRouter from './routes/withdrawalRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: './config.env' });

const app = express();

// 1. Disable problematic Express features
app.disable('etag'); // Prevent 304 status conflicts
app.disable('x-powered-by'); // Security measure

connectToMongoDB();
connectCloudinary();

// 2. Simplified CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// API Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/withdrawal', withdrawalRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/message', contactRouter);

// 3. Serve static files from Vite build
const staticDir = path.join(__dirname, 'dist');
app.use(express.static(staticDir, {
  // Cache settings for better performance
  maxAge: '1y',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store');
    }
  }
}));

// 4. Fixed SPA Fallback Handler
app.use((req, res, next) => {
  // Skip API routes
  if (req.path.startsWith('/api/')) return next();
  
  // Serve index.html for all non-API routes
  res.sendFile(path.join(staticDir, 'index.html'), (err) => {
    if (err) {
      console.error('SPA fallback error:', err);
      if (!res.headersSent) {
        res.status(500).send('Internal Server Error');
      }
    }
  });
});

// 5. Enhanced error handler
app.use((err, req, res, next) => {
  console.error('\n💥 UNEXPECTED ERROR:', err.message);
  console.error('Request URL:', req.originalUrl);
  console.error('Stack Trace:\n', err.stack);
  
  res.status(500).json({ 
    success: false, 
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`Serving static files from: ${staticDir}`);
});
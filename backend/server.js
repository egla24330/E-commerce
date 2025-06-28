import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import history from 'connect-history-api-fallback';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve client
app.use(history());
app.use(express.static(path.join(__dirname, 'client-dist')));

// Serve admin separately
app.use('/admin', history({
  index: '/admin/index.html',
}));
app.use('/admin', express.static(path.join(__dirname, 'admin-dist')));

// API routes
import apiRoutes from './routes/index.js';
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

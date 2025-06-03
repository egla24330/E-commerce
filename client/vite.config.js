import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

/*export default defineConfig({
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, '../backend/dist'), // send build output to backend
    emptyOutDir: true,
  },
});*/

// vite.config.js
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // ✅ This must match Render's expected folder
  },
});


// client/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // correct for serving at root
  plugins: [react()],
  build: {
    outDir: '../client-dist', // ✅ place dist in backend root
    emptyOutDir: true,
  },
});

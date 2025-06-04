// client/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // default
  plugins: [react()],
  build: {
    outDir: '../backend/client-dist',
    emptyOutDir: true,
  },
});

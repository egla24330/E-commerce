import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/admin/',
  build: {
    outDir: '../backend/admin-dist', // ✅ Save into backend folder directly
    emptyOutDir: true,
  },
  plugins: [react()],
});

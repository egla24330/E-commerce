// admin/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/admin/', // VERY IMPORTANT!
  plugins: [react()],
  build: {
    outDir: '../backend/admin-dist', // output admin build to backend folder
    emptyOutDir: true,
  },
});

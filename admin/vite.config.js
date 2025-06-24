// admin/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/admin/', // ✅ necessary for subpath deployment
  plugins: [react()],
  build: {
    outDir: '../admin-dist', // ✅ place dist in backend root
    emptyOutDir: true,
  },
});

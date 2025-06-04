import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/admin/',
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, '../backend/admin-dist'),
    emptyOutDir: true,
  },
});

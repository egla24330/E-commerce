import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/admin/', // for admin
  build: {
    outDir: 'dist-admin'
  }
});

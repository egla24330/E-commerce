import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // ✅ Match what Render expects
    emptyOutDir: true,
  },
});

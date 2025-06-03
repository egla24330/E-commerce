import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, '_redirects'),
          dest: '.' // this puts it in the dist root
        }
      ]
    })
  ],
  build: {
    outDir: path.resolve(__dirname, '../backend/dist'),
    emptyOutDir: true,
  },
});

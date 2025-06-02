/*import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
//export default defineConfig({
 // plugins: [react()],
  //server:{port:5173}
//}//)


import { resolve } from 'path'
import { readFileSync } from 'fs'

export default {
  plugins: [
    {
      name: 'copy-redirects',
      closeBundle() {
        const redirectsPath = resolve(__dirname, 'client/public/_redirects')
        this.emitFile({
          type: 'asset',
          fileName: '_redirects',
          source: readFileSync(redirectsPath, 'utf-8')
        })
      }
    }
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  },//server:{port:5173}

}


// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    // Vite automatically copies files from public directory
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  }
});

*/

// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // ✅ IMPORTANT: this tells Vite how to resolve routes
  build: {
    outDir: 'dist', // default is 'dist', but confirm it matches your server
  },
});

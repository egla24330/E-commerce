import { defineConfig } from 'vite'
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

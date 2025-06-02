import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: path.resolve(__dirname, '../backend/dist'), // ✅ THIS sends the build into backend/dist
    emptyOutDir: true // optional: deletes old files
  }
})

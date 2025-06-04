import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/admin/',  // This tells Vite that all assets should use this base path
  plugins: [react()],
})

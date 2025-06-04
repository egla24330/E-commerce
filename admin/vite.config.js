// admin/vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/admin/', // <<< Important: tells Vite where to load assets from
  plugins: [react()],
})

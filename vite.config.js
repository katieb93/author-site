import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Two pages: the home page and /photography/
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        photography: resolve(import.meta.dirname, 'photography/index.html'),
      },
    },
  },
})

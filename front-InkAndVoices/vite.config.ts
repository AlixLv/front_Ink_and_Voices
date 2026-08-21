import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import Pages from 'vite-plugin-pages'

export default defineConfig({
  plugins: [react(), Pages({
    dirs: 'src/pages',
  })],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  server: {
    host: '0.0.0.0',
    port: 5177,
    watch: {
      usePolling: true
    }
  }
})
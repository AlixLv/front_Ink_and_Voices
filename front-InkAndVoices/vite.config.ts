import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',      // Permet l'accès depuis l'extérieur du container
    port: 5173,
    watch: {
      usePolling: true    // Nécessaire pour le hot reload dans Docker sur Mac
    }
  }
})

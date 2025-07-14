import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',       // allow external access
    port: 5173,
    strictPort: true,
    allowedHosts: ['1c24-2400-1a00-bc10-200b-a79b-8287-b7bc-b6b7.ngrok-free.app'],   // allow any external domain (including ngrok)
    origin: 'https://vite', // required dummy origin for some versions

    // Critical for ngrok HMR to work properly over HTTPS
    hmr: {
      protocol: 'wss',
      host: 'localhost',
      clientPort: 443
    }
  }
})

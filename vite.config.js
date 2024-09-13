import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/v1/check': {
        target: 'https://ssl-checker.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1\/check/, '/api/v1/check'),
      },
    }
  }
})

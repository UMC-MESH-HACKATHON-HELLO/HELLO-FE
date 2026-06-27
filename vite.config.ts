import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    global: 'globalThis',
  },
  // 👇 외부 호스트(도메인) 접속 허용 설정 추가
  server: {
    allowedHosts: ['hello.sublumen.xyz'],
    proxy: {
      '/api': { target: 'http://54.116.182.195:8080', changeOrigin: true },
      '/signup': { target: 'http://54.116.182.195:8080', changeOrigin: true },
      '/login': { target: 'http://54.116.182.195:8080', changeOrigin: true },
      '/logout': { target: 'http://54.116.182.195:8080', changeOrigin: true },
      '/helper': { target: 'http://54.116.182.195:8080', changeOrigin: true },
      '/ws': { target: 'http://54.116.182.195:8080', changeOrigin: true, ws: true },
    },
  },
  preview: {
    allowedHosts: ['hello.sublumen.xyz']
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // 👇 외부 호스트(도메인) 접속 허용 설정 추가
  server: {
    allowedHosts: ['hello.sublumen.xyz'],
    proxy: {
      '/api': 'http://54.116.182.195:8080',
      '/signup': 'http://54.116.182.195:8080',
      '/login': 'http://54.116.182.195:8080',
      '/logout': 'http://54.116.182.195:8080',
      '/helper': 'http://54.116.182.195:8080',
      '/ws': { target: 'http://54.116.182.195:8080', ws: true },
    },
  },
  preview: {
    allowedHosts: ['hello.sublumen.xyz']
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // 👇 외부 호스트(도메인) 접속 허용 설정 추가
  server: {
    allowedHosts: ['hello.sublumen.xyz'] 
  },
  preview: {
    allowedHosts: ['hello.sublumen.xyz']
  }
})

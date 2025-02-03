import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg'], // 이미지 처리
  server: {
    proxy: {
      '/api': {
        target: 'http://3.38.151.77:8080',
        changeOrigin: true,
        asecure: false,
        credentials: true,
        rewrite: (path) => path,
      },
    },
  },
})
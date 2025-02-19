import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify('development'),
    __WS_TOKEN__: JSON.stringify(process.env.VITE_WS_TOKEN || 'default_token_value'),
  },
  plugins: [react()],
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg'], // 이미지 처리
  server: {
    proxy: {
      '/api': {
        target: 'http://35.172.251.131:8080',
        changeOrigin: true,
        asecure: false,
        credentials: true,
        rewrite: (path) => path,
      },
      '/login': {
        target: 'http://35.172.251.131:8080/oauth/authorize/kakao',
        changeOrigin: true,
        secure: false,
        credentials: true,
        rewrite: (path) => '/signup',
      },
    },
  },
})
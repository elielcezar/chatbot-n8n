import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/widget.tsx'),
      name: 'ChatBot',
      fileName: 'chatbot',
      formats: ['iife'], // IIFE para uso em script tag
    },
    rollupOptions: {
      // Não externalizar nada - bundle completo
      external: [],
      output: {
        // Expor como variável global
        name: 'ChatBot',
        // Inlinear CSS no JS para ter apenas 1 arquivo
        assetFileNames: 'chatbot.[ext]',
      },
    },
    // Minificar para produção
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  // Configuração para desenvolvimento
  server: {
    port: 3000,
    open: true,
  },
})


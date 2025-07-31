import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import path from 'path';

export default defineConfig({
  plugins: [preact()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/mount.tsx'),
      name: 'ChatbotWidget',
      fileName: 'chatbot-widget',
      formats: ['iife'], // IIFE for browser-ready CDN
    },
    rollupOptions: {
      output: {
        globals: {
          preact: 'preact',
        },
      },
    },
  },
});

// vite.config.ts
import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
  plugins: [preact()],
  build: {
    lib: {
      entry: 'src/mount.tsx',
      name: 'ChatbotWidget',
      fileName: 'chatbot-widget',
      formats: ['iife'], // 👈 IIFE makes it globally available
    },
  },
});

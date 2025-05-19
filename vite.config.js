import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    server: {
      port: 3001,
      proxy:{
        '/api': {
          target: 'http://localhost:3001'
        },
      }
    },
    build: {
      outDir: 'build',
    },
    plugins: [
      react(),
    ]
  };
});
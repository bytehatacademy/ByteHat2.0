import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', 
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 3000,
    host: '0.0.0.0', // Makes the server accessible outside localhost
  },
  build: {
    outDir: 'build',
    assetsDir: 'assets',
    sourcemap: false,
    // Generate SPA fallback for client-side routing
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react', 'react-helmet-async'],
        },
      },
    },
  },
  preview: {
    port: 3000,
    host: '0.0.0.0',
  },
});
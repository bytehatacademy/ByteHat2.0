import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

/**
 * Vite configuration for development and production
 * @see https://vitejs.dev/config/
 */
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  
  return {
    plugins: [react()],
    base: '/',
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
      port: 3000,
      host: '0.0.0.0', // Allow external connections from Replit
      strictPort: true,
    },
    build: {
      outDir: 'build',
      assetsDir: 'assets',
      sourcemap: false,
      // Production optimizations
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: isProd, // Remove console.log in production
          drop_debugger: isProd,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
            lucide: ['lucide-react'],
          },
        },
      },
      // Improve build reporting
      reportCompressedSize: true,
      chunkSizeWarningLimit: 1000,
    },
    // Environment variables
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
  };
});
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode`
  const env = loadEnv(mode, process.cwd(), '');
  
  // Validate critical environment variables
  const requiredEnvVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID'
  ];

  const missingVars = requiredEnvVars.filter(varName => !env[varName]);
  
  if (missingVars.length > 0) {
    console.error('Missing environment variables:', missingVars);
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        'three': path.resolve(__dirname, 'node_modules/three'),
        '@react-three/fiber': path.resolve(__dirname, 'node_modules/@react-three/fiber'),
        '@react-three/drei': path.resolve(__dirname, 'node_modules/@react-three/drei')
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: mode === 'production',
      minify: mode === 'production',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      },
      chunkSizeWarningLimit: 1000,
    },
    server: {
      port: 3000,
      open: true,
      hmr: {
        overlay: true,
      },
    },
    preview: {
      port: 3000,
    },
    define: {
      'process.env': env
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'framer-motion',
        '@react-three/fiber',
        '@react-three/drei',
        'three',
        'lucide-react',
        'firebase',
        'gsap'
      ],
      esbuildOptions: {
        target: 'es2020'
      }
    }
  };
});

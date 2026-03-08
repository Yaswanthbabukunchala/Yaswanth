import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/** Base path for assets and routes (e.g. for Vercel preview or subpath deployment). */
const getBase = (mode: string, env: Record<string, string>): string => {
  if (env.VITE_BASE_PATH) return env.VITE_BASE_PATH;
  return '/';
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: getBase(mode, env),
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  };
});

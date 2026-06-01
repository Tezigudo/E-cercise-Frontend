import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  // 1. Load from .env files
  const fileEnv = loadEnv(mode, process.cwd(), '');

  // 2. Merge with real process.env (which has API_BASE_URL from Docker)
  const mergedEnv = {
    ...process.env,
    ...fileEnv,
  };

  return {
    define: {
      // Only expose the specific keys the app needs — never serialize the whole env.
      'process.env.API_BASE_URL': JSON.stringify(mergedEnv.API_BASE_URL),
    },
    plugins: [react(), svgr()],
  };
});

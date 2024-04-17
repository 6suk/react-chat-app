import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const envDir = '../';
  const env = loadEnv(mode, envDir);

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': 'client/src',
        '@components': 'client/src/components',
        '@hooks': 'client/src/hooks',
        '@pages': 'client/src/pages',
        '@store': 'client/src/store',
        '@context': 'client/src/context',
        '@utils': 'client/src/utils',
      },
    },
    envDir,
    server: {
      port: env.VITE_CLIENT_PORT || 5173,
    },
  };
});

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
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
});

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export const APP_PORT = 5174;

export default defineConfig({
  root: import.meta.dirname,
  plugins: [react()],
  server: { port: APP_PORT, strictPort: true },
  build: { target: 'es2023' },
});

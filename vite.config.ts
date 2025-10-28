import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/react-full-screen-video-element-test',
  plugins: [react()],
});

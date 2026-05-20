import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
  site: 'https://bigdaystudios.com',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    domains: ['res.cloudinary.com'],
  },
});

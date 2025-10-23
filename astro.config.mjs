// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import pages from 'astro-pages';
import node from '@astrojs/node';

const groupPattern = /\/?\([^/]+?\)/g;

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3000,
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ['debug', 'class-variance-authority'],
    },
    define: {
      global: 'globalThis',
    },
    server: {
      proxy: {
        '/api/v1': {
          target: 'http://localhost:8080',
        },
      },
    },
  },
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [
    react(),
    pages({
      dir: 'features',
      pattern: ({ pattern }) => {
        const group = pattern.replace(groupPattern, '');
        console.log(`http://localhost:${3000}${group}`);
        return group;
      },
      log: 'verbose',
    }),
  ],
});

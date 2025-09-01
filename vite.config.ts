import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from 'lovable-tagger';
import nodePolyfills from 'rollup-plugin-polyfill-node';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
   const isDevelopment = mode === 'development';
   const isProduction = mode === 'production';

   return {
      server: {
         host: '::',
         port: 8080,
      },
      plugins: [
         react(),
         isDevelopment && componentTagger(),
         // Add node polyfills for development
         !isProduction &&
            nodePolyfills({
               include: [
                  'node_modules/**/*.js',
                  new RegExp('node_modules/.vite/.*js'),
               ],
            }),
      ].filter(Boolean),
      resolve: {
         alias: {
            '@': path.resolve(__dirname, './src'),
         },
      },
      build: {
         rollupOptions: {
            plugins: [
               // Node polyfills needed for build
               nodePolyfills(),
            ],
         },
         // Needed for WalletConnect and other providers
         commonjsOptions: {
            transformMixedEsModules: true,
         },
      },
      define: {
         global: 'globalThis',
      },
   };
});

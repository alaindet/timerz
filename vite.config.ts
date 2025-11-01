import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  base: '/timerz/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Service worker registration automatically
      manifest: {
        name: 'Timerz',
        short_name: 'Timerz',
        description: 'A simple app to create timers for a big display',
        theme_color: '#242424',
        background_color: '#242424',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'logo-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'logo-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    }),
  ],
})

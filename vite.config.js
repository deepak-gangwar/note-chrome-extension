import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
import path from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        "popup": path.resolve('src/popup'),
        // options: path.resolve('src/options/options.tsx'),
        "background": path.resolve('src/background'),
        "content-script": path.resolve('src/content-script'),
        // newTab: path.resolve('src/tabs/index.tsx')
      },
      output: {
        entryFileNames: '[name].js',
      }
    },

    // watch: {
    // include: 'src/**'
    // https://rollupjs.org/configuration-options/#watch
    // },
  },

  server:
  {
    https: true,
    open: true,
    port: 8080,
  },

  // copies all files from this directory as-is
  publicDir: './src/static',
  plugins: [
    react(),

    // this is for HTTPS connection
    mkcert(),
  ],
})

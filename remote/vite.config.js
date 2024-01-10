import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), federation({
    name: 'remote_app',
    filename: 'remoteEntry.js',
    exposes: {
      './Button': './src/Button',
      './App': './src/App'
    },
    shared: ['react', 'react-dom', 'react-redux']
  })],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: '/', // make sure this is '/' if deploying to root domain
  build: {
    outDir: 'dist' // default is 'dist', but explicit is better
  }
})

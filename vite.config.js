import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages set BASE_PATH=/<repo-name>/ when building.
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/',
})

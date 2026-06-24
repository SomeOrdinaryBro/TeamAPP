import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base: './' keeps all asset URLs relative so the static build works whether
// it's served from a domain root or a sub-path (GitHub Pages, S3 prefix, etc.).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})

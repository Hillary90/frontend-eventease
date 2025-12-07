import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
 my-new-branch

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  base: "/frontend-eventease/"  // <-- keep this

import tailwindcss from  "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), 
    tailwindcss()
  ],
  server: {
    port: 3000
  },
  base: "/frontend-eventease/"
 dev
})

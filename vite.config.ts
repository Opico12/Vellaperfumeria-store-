
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/tienda/', // ESTO ES LA CLAVE: Le dice a la web que vive en esa carpeta
})

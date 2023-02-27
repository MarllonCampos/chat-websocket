import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import 'dotenv/config'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {


  return {
    plugins: [react()],
    server: {
      port: Number(process.env.PORT),
      host: "0.0.0.0",
    },
    preview: {
      port: Number(process.env.PORT),
      host: "0.0.0.0"
    }
  }
})


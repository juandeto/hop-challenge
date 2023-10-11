import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom'
  },
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src")}
    ]
  },
})

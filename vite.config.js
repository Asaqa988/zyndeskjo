import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // React Fast Refresh (hot reload) is provided by @vitejs/plugin-react.
  plugins: [react()],
  base: './',
  server: {
    host: true,        // expose on the local network so phones/other devices see live edits
    port: 5173,
    strictPort: false, // fall back to the next free port instead of failing
    open: true,        // auto-open the browser when `npm run dev` starts
    hmr: {
      overlay: true,   // show build/runtime errors as an overlay in the page
    },
    watch: {
      // Windows file events are unreliable on some setups; polling guarantees
      // every save is picked up and hot-reloaded immediately.
      usePolling: true,
      interval: 100,
    },
  },
})

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ✅ This config ensures:
// - Functions proxy works locally
// - Production builds remain clean
// - Netlify deploys without any issue

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // you can change this if needed
    proxy: {
      "/.netlify/functions": {
        target: "http://localhost:8888", // Netlify Functions local server
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: "dist",
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: ".",
  build: {
    outDir: "dist/public",
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3000,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port: 3000,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});

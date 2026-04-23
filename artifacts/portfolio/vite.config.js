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
  root: path.resolve(__dirname),  // <-- PENTING: harus absolute path
  build: {
    outDir: path.resolve(__dirname, "dist/public"),  // <-- outDir juga absolute
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
  },
});
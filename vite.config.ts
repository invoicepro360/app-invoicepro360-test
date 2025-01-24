import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080, // Replace with your desired port
  },
  define: {
    'process.env': {}, // Ensure process is polyfilled
    // Provide global variables
    // cash: "cash-dom", 
    // Popper: '@popperjs/core', 
  },

  build: {
    commonjsOptions: {
      include: ["tailwind.config.js", "node_modules/**"],      
    },
  },
  optimizeDeps: {
    include: [
      "tailwind-config",
      // 'cash-dom', // Pre-bundle cash-dom
      // '@popperjs/core', // Pre-bundle @popperjs/core
    ],
    
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@use "./src/assets/sass/tw-starter/dist/scss/mixins/media" as *;`, // Automatically include mixins in all Sass files
      },
    },
  },
  
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src/", import.meta.url)),
      "~": fileURLToPath(new URL("./node_modules", import.meta.url)),
      // 'cash-dom': 'node_modules/cash-dom/dist/cash.min.js', // Optional aliasing
      "tailwind-config": fileURLToPath(
        new URL("./tailwind.config.js", import.meta.url)
      ),
    },
  },
});

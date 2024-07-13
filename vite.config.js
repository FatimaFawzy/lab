import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(() => {
     return {
          plugins: [vue()],
          build: {
               minify: true,
          },
          resolve: {
               alias: {
                    "@": fileURLToPath(new URL("./src", import.meta.url)),
               },
          },
     };
});

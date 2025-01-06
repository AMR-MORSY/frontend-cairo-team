import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import path from "path-browserify"

import vue from "@vitejs/plugin-vue";
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      path: "path-browserify",
    },
  },
  noImplicitAny: false,
  allowJs: true,
});

import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/front_6th_chapter1-1/" : "/",

  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"),
      output: {
        entryFileNames: "assets/main-[hash].js",
        manualChunks: undefined,
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    exclude: ["**/e2e/**", "**/*.e2e.spec.js", "**/node_modules/**"],
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
  },
});

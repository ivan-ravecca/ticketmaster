import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "",
  build: {
    outDir: "./build",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.js",
    environmentMatchGlobs: [["**/*.test.tsx", "jsdom"]],
    compilerOptions: {
      types: ["vitest/globals"],
    },
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: [
        "build/assets/**",
        "**/*.test.jsx",
        "**/*.config.js",
        "**/App.jsx",
        "**/main.jsx",
      ],
    },
    reportsDirectory: "./coverage",
  },
});

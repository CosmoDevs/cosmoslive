import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.js",
  },

  esbuild: {
    loader: "jsx",
    include: [/\.jsx$/], // 👈 tell Vitest to treat .jsx files as JSX
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

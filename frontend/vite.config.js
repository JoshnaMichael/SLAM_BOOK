import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/SLAM_BOOK/",
  build: { outDir: "dist" }
});
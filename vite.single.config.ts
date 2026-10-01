import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// Builds one self-contained index.html (JS, CSS and fonts inlined) into dist-single/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  build: { outDir: "dist-single", assetsInlineLimit: 100000000, cssCodeSplit: false },
});

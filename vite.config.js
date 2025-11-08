import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "https://brianhelsel.github.io/elliott-says",
  plugins: [react()],
});

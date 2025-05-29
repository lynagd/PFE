import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Now you can use '@/components/DoctorPage'
    },
  },
  server: {
    historyApiFallback: true,
  },
});

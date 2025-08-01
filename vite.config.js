import react from "@vitejs/plugin-react-swc";
import path from "path";
// import { componentTagger } from "lovable-tagger"; // This plugin causes a peer dependency conflict with Vite v7.

// https://vitejs.dev/config/
export default ({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // The componentTagger plugin is commented out to resolve the npm ERESOLVE error.
    // It requires Vite v5, while the current project uses Vite v7.
    // You may need to find an alternative or an updated version of this package.
    // mode === 'development' &&
    // componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

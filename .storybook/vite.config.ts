import { defineConfig } from 'vite'

export default defineConfig({
  base: '/storybook-static/',
  build: {
    // Ensure assets use absolute paths
    assetsDir: 'assets',
    // Disable source maps in production to avoid eval issues
    sourcemap: false,
    // Ensure proper minification
    minify: 'esbuild',
  },
  // Ensure proper module resolution
  resolve: {
    preserveSymlinks: false,
  },
})


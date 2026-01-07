import { defineConfig } from 'vite'

export default defineConfig({
  base: '/storybook-static/',
  define: {
    'process.env': {},
    'process': {
      env: {},
    },
  },
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


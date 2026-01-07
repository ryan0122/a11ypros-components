#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const storybookDir = path.join(__dirname, '../apps/web/public/storybook-static')
const indexHtmlPath = path.join(storybookDir, 'index.html')

if (!fs.existsSync(indexHtmlPath)) {
  console.error('Storybook index.html not found at:', indexHtmlPath)
  process.exit(1)
}

let html = fs.readFileSync(indexHtmlPath, 'utf8')

// Replace relative paths with absolute paths
// ./sb-manager/runtime.js -> /storybook-static/sb-manager/runtime.js
html = html.replace(/href="\.\//g, 'href="/storybook-static/')
html = html.replace(/src="\.\//g, 'src="/storybook-static/')
html = html.replace(/import '\.\//g, "import '/storybook-static/")
html = html.replace(/import "\.\//g, 'import "/storybook-static/')
html = html.replace(/url\('\.\//g, "url('/storybook-static/")
html = html.replace(/url\("\.\//g, 'url("/storybook-static/')

// Fix JSON file references (Storybook loads index.json, project.json, etc.)
html = html.replace(/(["'])(\.\/)?([^"']+\.json)(["'])/g, '$1/storybook-static/$3$4')

// Fix logo path if it's using /logo.png
html = html.replace(/\/logo\.png/g, '/storybook-static/logo.png')

// Remove ALL CSP meta tags - we'll handle CSP via HTTP headers only
// This prevents any conflicts between meta tags and HTTP headers
html = html.replace(/<meta[^>]*http-equiv=["']Content-Security-Policy["'][^>]*>/gi, '')

fs.writeFileSync(indexHtmlPath, html, 'utf8')
console.log('✅ Fixed Storybook paths and added CSP meta tag in index.html')


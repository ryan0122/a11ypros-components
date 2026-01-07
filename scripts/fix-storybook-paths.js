#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const storybookDir = path.join(__dirname, '../apps/web/public/storybook-static')
const indexHtmlPath = path.join(storybookDir, 'index.html')
const iframeHtmlPath = path.join(storybookDir, 'iframe.html')

function fixHtmlPaths(html) {
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
  
  return html
}

// Fix index.html
if (!fs.existsSync(indexHtmlPath)) {
  console.error('Storybook index.html not found at:', indexHtmlPath)
  process.exit(1)
}

let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8')
indexHtml = fixHtmlPaths(indexHtml)
fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8')
console.log('✅ Fixed Storybook paths in index.html')

// Fix iframe.html (where components actually render)
if (fs.existsSync(iframeHtmlPath)) {
  let iframeHtml = fs.readFileSync(iframeHtmlPath, 'utf8')
  iframeHtml = fixHtmlPaths(iframeHtml)
  fs.writeFileSync(iframeHtmlPath, iframeHtml, 'utf8')
  console.log('✅ Fixed Storybook paths in iframe.html')
} else {
  console.warn('⚠️  iframe.html not found - components may not load correctly')
}


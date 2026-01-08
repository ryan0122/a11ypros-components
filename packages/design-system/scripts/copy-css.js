#!/usr/bin/env node

import { cpSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const srcDir = join(__dirname, '../src')
const distDir = join(__dirname, '../dist')

// Create dist/styles directory
const stylesDistDir = join(distDir, 'styles')
if (!existsSync(stylesDistDir)) {
  mkdirSync(stylesDistDir, { recursive: true })
}

// Copy global.css and components.css to dist/styles/
const stylesToCopy = ['global.css', 'components.css']
stylesToCopy.forEach(file => {
  const srcFile = join(srcDir, 'styles', file)
  const destFile = join(stylesDistDir, file)
  if (existsSync(srcFile)) {
    cpSync(srcFile, destFile)
    console.log(`Copied ${file} to dist/styles/`)
  }
})

// Copy component CSS files maintaining directory structure
// This is needed because components.css uses relative imports
import { readdirSync } from 'fs'

const componentsDir = join(srcDir, 'components')
const componentsDistDir = join(distDir, 'components')

function copyComponentCSS(dir, distBase) {
  const entries = readdirSync(dir, { withFileTypes: true })
  
  entries.forEach(entry => {
    const srcPath = join(dir, entry.name)
    const distPath = join(distBase, entry.name)
    
    if (entry.isDirectory()) {
      if (!existsSync(distPath)) {
        mkdirSync(distPath, { recursive: true })
      }
      copyComponentCSS(srcPath, distPath)
    } else if (entry.isFile() && entry.name.endsWith('.css')) {
      cpSync(srcPath, distPath)
      console.log(`Copied ${entry.name} to ${distPath.replace(process.cwd(), '.')}`)
    }
  })
}

if (existsSync(componentsDir)) {
  if (!existsSync(componentsDistDir)) {
    mkdirSync(componentsDistDir, { recursive: true })
  }
  copyComponentCSS(componentsDir, componentsDistDir)
}

console.log('CSS files copied successfully!')


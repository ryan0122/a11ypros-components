# Reinstall Dependencies - Required

## Problem
Your `node_modules` folder exists but Next.js is not properly installed. The installation is incomplete or corrupted.

## Solution: Clean Reinstall

Run these commands **in order**:

```bash
cd /Users/rmack/Projects/PORTFOLIO/a11ypros-components

# 1. Remove existing node_modules and lock files
rm -rf node_modules package-lock.json
rm -rf apps/web/node_modules apps/web/.next
rm -rf packages/design-system/node_modules

# 2. If you get permission errors, fix npm permissions first:
sudo chmod -R 755 ~/.nvm/versions/node/v22.13.1/lib/node_modules/npm

# 3. Install dependencies
npm install

# 4. Verify Next.js is installed
cd apps/web
npx next --version
```

## Alternative: Use Yarn or pnpm

If npm continues to have issues:

```bash
# Install yarn globally (if needed)
npm install -g yarn

# Then use yarn
cd /Users/rmack/Projects/PORTFOLIO/a11ypros-components
rm -rf node_modules yarn.lock
rm -rf apps/web/node_modules
yarn install
yarn dev
```

## After Successful Installation

You should see:
- `node_modules/.bin/next` exists
- `npx next --version` shows a version number
- `npm run dev` starts the development server

## If Still Having Issues

1. Check Node.js version: `node --version` (should be >= 18.0.0)
2. Try a different Node version: `nvm use 20` then `npm install`
3. Check disk space: `df -h`
4. Check npm cache: `npm cache clean --force`


# Quick Fix: Install Dependencies

## The Problem
Dependencies are not installed. The `node_modules` folder exists but is empty or incomplete.

## Solution

Run these commands in your terminal:

```bash
cd /Users/rmack/Projects/PORTFOLIO/a11ypros-components

# Option 1: Try npm install (if permissions are fixed)
npm install

# Option 2: If npm has permission issues, use yarn
# First install yarn if needed: npm install -g yarn
yarn install

# Option 3: Use pnpm
# First install pnpm: npm install -g pnpm
pnpm install
```

## After Installation

Once dependencies are installed, run:

```bash
npm run dev
# or
yarn dev
# or  
pnpm dev
```

## Verify Installation

Check if Next.js is installed:

```bash
cd apps/web
npx next --version
```

If this shows a version number, you're good to go!

## If npm Still Has Permission Issues

Fix npm permissions first:

```bash
sudo chmod -R 755 ~/.nvm/versions/node/v22.13.1/lib/node_modules/npm
```

Then try `npm install` again.


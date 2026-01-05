# Installation Instructions

## Issue: npm Permissions Error

You're encountering a macOS permissions error with npm. Here's how to fix it:

## Solution 1: Fix npm Permissions (Recommended)

```bash
# Fix permissions for npm
sudo chmod -R 755 ~/.nvm/versions/node/v22.13.1/lib/node_modules/npm

# Then try installing again
cd /Users/rmack/Projects/PORTFOLIO/a11ypros-components
npm install
```

## Solution 2: Use npx/npm with Different Node Version

If the above doesn't work, try switching to a different Node version:

```bash
# Switch to a different Node version
nvm use 20  # or another version you have installed

# Then install
cd /Users/rmack/Projects/PORTFOLIO/a11ypros-components
npm install
```

## Solution 3: Reinstall npm

If permissions persist:

```bash
# Reinstall npm for the current Node version
npm install -g npm@latest

# Then try installing project dependencies
cd /Users/rmack/Projects/PORTFOLIO/a11ypros-components
npm install
```

## Solution 4: Use Yarn or pnpm Instead

If npm continues to have issues, you can use an alternative package manager:

```bash
# Install yarn
npm install -g yarn

# Or install pnpm
npm install -g pnpm

# Then use it instead
cd /Users/rmack/Projects/PORTFOLIO/a11ypros-components
yarn install  # or pnpm install
```

## After Installation

Once dependencies are installed, you can run:

```bash
# Start development server
npm run dev

# Or with yarn/pnpm
yarn dev  # or pnpm dev

# Start Storybook
npm run storybook
```

## Verify Installation

Check if Next.js is installed:

```bash
cd /Users/rmack/Projects/PORTFOLIO/a11ypros-components/apps/web
npx next --version
```

If this works, dependencies are installed correctly.


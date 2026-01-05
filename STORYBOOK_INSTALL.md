# Storybook 9 Installation Guide

## Issue: npm Permissions Error

You're encountering npm permissions issues. Here are solutions:

## Solution 1: Fix npm Permissions (Recommended)

Run this command in your terminal:

```bash
sudo chmod -R 755 ~/.nvm/versions/node/v22.13.1/lib/node_modules/npm
```

Then try installing again:

```bash
cd /Users/rmack/Projects/PORTFOLIO/a11ypros-components
npm install
```

## Solution 2: Use Yarn Instead

If npm continues to have issues, use yarn:

```bash
# Install yarn globally (if needed)
npm install -g yarn

# Then use yarn
cd /Users/rmack/Projects/PORTFOLIO/a11ypros-components
yarn install
yarn storybook
```

## Solution 3: Use pnpm

```bash
# Install pnpm globally (if needed)
npm install -g pnpm

# Then use pnpm
cd /Users/rmack/Projects/PORTFOLIO/a11ypros-components
pnpm install
pnpm storybook
```

## After Installation

Once dependencies are installed, you can run:

```bash
npm run storybook
# or
yarn storybook
# or
pnpm storybook
```

Storybook will be available at `http://localhost:6006`

## Note

I've updated the Storybook scripts to use `npx storybook@9` which will automatically download and run Storybook 9 if it's not installed locally. However, you still need to install the dependencies for the best experience.


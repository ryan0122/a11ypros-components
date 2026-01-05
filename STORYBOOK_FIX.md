# Storybook 9 Configuration Fix

## Issue
Storybook dependencies need to be installed. When using `npx`, it can't access locally installed addons.

## Solution
I've moved Storybook dependencies to the root `package.json` so they're available to the entire monorepo.

## Changes Made

1. **Moved Storybook dependencies to root** - All Storybook packages are now in the root `package.json`
2. **Updated root scripts** - Storybook commands now run from root with proper config directory
3. **Updated package scripts** - Design system package scripts now delegate to root

## Installation

You need to install dependencies. Try one of these:

### Option 1: Fix npm permissions and install
```bash
sudo chmod -R 755 ~/.nvm/versions/node/v22.13.1/lib/node_modules/npm
cd /Users/rmack/Projects/PORTFOLIO/a11ypros-components
npm install
```

### Option 2: Use yarn
```bash
npm install -g yarn
cd /Users/rmack/Projects/PORTFOLIO/a11ypros-components
yarn install
```

### Option 3: Use pnpm
```bash
npm install -g pnpm
cd /Users/rmack/Projects/PORTFOLIO/a11ypros-components
pnpm install
```

## Running Storybook

After installing dependencies:

```bash
npm run storybook
# or
yarn storybook
# or
pnpm storybook
```

Storybook will be available at `http://localhost:6006`

## Why This Works

- Storybook dependencies are at the root level, accessible to all packages
- The config directory is correctly pointed to `.storybook` at the root
- All paths in config files are relative to the root directory


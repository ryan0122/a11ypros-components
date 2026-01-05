# Storybook 9 Version Fix

## Issue
The error `i.renderer is not a function` occurs when Storybook packages have version mismatches. Using `npx storybook@9` downloads the latest version (9.1.17) while package.json had `^9.0.0`, causing conflicts.

## Solution
I've pinned all Storybook packages to the exact same version (9.1.17) and updated the scripts to use the locally installed version instead of npx.

## Changes Made

1. **Pinned all Storybook packages to 9.1.17** - Exact version matching prevents conflicts
2. **Updated scripts** - Changed from `npx storybook@9` to `storybook` to use local installation
3. **Added framework options** - Added `strictMode: true` to framework config

## Next Steps

**You MUST install dependencies for this to work:**

```bash
cd /Users/rmack/Projects/PORTFOLIO/a11ypros-components

# Option 1: Use yarn (recommended if npm has permission issues)
yarn install

# Option 2: Fix npm permissions first
sudo chmod -R 755 ~/.nvm/versions/node/v22.13.1/lib/node_modules/npm
npm install
```

After installing, run:
```bash
npm run storybook
# or
yarn storybook
```

## Why This Fixes It

- **Version consistency**: All Storybook packages are on the exact same version
- **Local installation**: Using local `storybook` command ensures it uses the installed packages
- **No npx conflicts**: Avoids version mismatches from npx cache

The renderer error happens when Storybook tries to use a renderer from a different version than the framework expects. Pinning versions ensures everything matches.


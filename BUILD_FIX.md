# Build Fix Instructions

## Issues Fixed

1. **CSS Import Path**: Fixed the CSS import in `apps/web/app/layout.tsx` to use a relative path through the globals.css file instead of directly importing from the design system package.

## Remaining Issue: Permissions Error

The build is failing with "Operation not permitted" errors when Next.js tries to read files from `node_modules`. This is a macOS file permissions issue.

## Solutions

### Option 1: Reinstall Dependencies (Recommended)
```bash
cd /Users/rmack/Projects/PORTFOLIO/a11ypros-components
rm -rf node_modules package-lock.json
rm -rf apps/web/node_modules apps/web/.next
rm -rf packages/design-system/node_modules
npm install
```

If you get permission errors, you may need to use `sudo` or fix permissions first:
```bash
sudo chmod -R u+w node_modules
```

### Option 2: Fix Permissions
```bash
cd /Users/rmack/Projects/PORTFOLIO/a11ypros-components
sudo chmod -R 755 node_modules
```

### Option 3: Clean Build
```bash
cd /Users/rmack/Projects/PORTFOLIO/a11ypros-components
npm run clean  # if you add a clean script
rm -rf .next apps/web/.next
npm install
npm run build
```

## Changes Made

1. Updated `apps/web/app/layout.tsx` to import CSS through `globals.css`
2. Updated `apps/web/app/styles/globals.css` to import design system styles using `@import`
3. Updated `apps/web/next.config.js` with webpack configuration

## Next Steps

1. Try reinstalling dependencies with the commands above
2. If permissions persist, check macOS security settings
3. Ensure you have write permissions to the project directory


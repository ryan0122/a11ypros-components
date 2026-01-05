# Storybook 9 Upgrade

## Changes Made

1. **Updated to Storybook 9.0.0** - Latest version with improved performance and features
2. **Switched from Webpack to Vite** - Storybook 9 uses Vite by default for better performance
3. **Updated all Storybook packages** to version 9.0.0

## Installation

After updating the package.json, run:

```bash
cd /Users/rmack/Projects/PORTFOLIO/a11ypros-components
npm install
```

Or if using yarn:

```bash
yarn install
```

## Key Features in Storybook 9

- **48% smaller bundle size** - Faster installations and better performance
- **Integrated Component Testing** - Test interactions, accessibility, visual, and coverage tests
- **Tag-based organization** - Better organization with custom tags
- **Story Globals** - Set themes, viewports, and locales globally
- **Vite-based** - Faster builds and hot module replacement

## Running Storybook

```bash
npm run storybook
# or
yarn storybook
```

Storybook will be available at `http://localhost:6006`

## Build Storybook

```bash
npm run build-storybook
# or
yarn build-storybook
```

## Migration Notes

- Framework changed from `@storybook/react-webpack5` to `@storybook/react-vite`
- Configuration format remains mostly the same
- All addons are compatible with version 9


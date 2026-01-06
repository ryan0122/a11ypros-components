import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming'

const theme = create({
  base: 'light',
  brandTitle: 'A11y Pros Design System',
  brandUrl: '/',
  brandImage: '/logo.png', // Path to your logo file (served from staticDirs)
  brandTarget: '_self',
  
  // Optional: Customize colors to match your brand
  colorPrimary: '#0e8168',
  colorSecondary: '#001d2f',
  
  // // UI colors
  // appBg: '#ffffff',
  // appContentBg: '#ffffff',
  // appPreviewBg: '#ffffff',
  // appBorderColor: '#e5e5e5',
  // appBorderRadius: 4,
  
  // // Text colors
  // textColor: '#171717',
  // textInverseColor: '#ffffff',
  // textMutedColor: '#737373',
  
  // Toolbar colors
  barTextColor: '#171717',
  barSelectedColor: '#0e8168', // Selected nav item color (matches colorPrimary)
  barHoverColor: '#f5f5f5', // Hover color for nav items in left sidebar
  barBg: '#ffffff',
  
  // // Form colors
  // inputBg: '#ffffff',
  // inputBorder: '#d4d4d4',
  // inputTextColor: '#171717',
  // inputBorderRadius: 4,
})

addons.setConfig({
  theme,
})


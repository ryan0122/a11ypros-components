import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming'
import './custom.css'

const theme = create({
  base: 'light',
  brandTitle: 'A11y Pros Design System',
  brandUrl: '/storybook',
  brandImage: '/storybook-static/logo.png', // Path to your logo file (served from staticDirs)
  brandTarget: '_self',
  
  colorPrimary: '#0e8168',
  colorSecondary: '#001d2f',
  
  // Toolbar colors
  barTextColor: '#171717',
  barSelectedColor: '#0e8168', // Selected nav item color (matches colorPrimary)
  barHoverColor: '#f5f5f5', // Hover color for nav items in left sidebar
  barBg: '#ffffff',
 
})

addons.setConfig({
  theme,
})


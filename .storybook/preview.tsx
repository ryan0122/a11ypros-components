import type { Preview } from '@storybook/react'
import '../packages/design-system/src/styles/global.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
    docs: {
      toc: false,
    },
  },
  decorators: [
    (Story) => {
      // Add custom CSS to override Storybook link colors
      if (typeof document !== 'undefined') {
        const styleId = 'storybook-link-color-override'
        if (!document.getElementById(styleId)) {
          const style = document.createElement('style')
          style.id = styleId
          style.textContent = `
            /* Override Storybook's default bright blue link color */
            .sbdocs a,
            .sbdocs a:link,
            .docs-story a,
            .docs-story a:link {
              color: #0e8168 !important;
            }
            .sbdocs a:hover,
            .docs-story a:hover {
              color: #075985 !important;
            }
            .sbdocs a:visited,
            .docs-story a:visited {
              color: #0369a1 !important;
            }
          `
          document.head.appendChild(style)
        }
      }
      return Story()
    },
  ],
}

export default preview


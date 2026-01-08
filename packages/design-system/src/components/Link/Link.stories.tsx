import type { Meta, StoryObj } from '@storybook/react'
import { Link } from './Link'

/**
 * # Link Component
 * 
 * An accessible link component with automatic external link detection, skip link support,
 * and proper focus management. Uses semantic `<a>` element with enhanced accessibility features.
 * 
 * ## Usage
 * 
 * ```tsx
 * import { Link } from '@a11ypros/a11y-ui-components'
 * 
 * function MyComponent() {
 *   return (
 *     <Link href="/about">
 *       Learn more about us
 *     </Link>
 *   )
 * }
 * ```
 * 
 * ## Features
 * 
 * - **External link detection**: Automatically adds \`rel="noopener noreferrer"\` for security
 * - **Skip links**: Special styling and behavior for keyboard navigation skip links
 * - **Focus management**: Clear focus indicators that meet WCAG contrast requirements
 * - **ARIA support**: Proper aria-label support for icon-only or context-dependent links
 * 
 * ## Accessibility
 * 
 * ### WCAG 2.1/2.2 Compliance
 * 
 * - **2.4.4 Link Purpose (In Context)**: Clear link text or aria-label that describes the link purpose
 * - **2.4.7 Focus Visible**: Clear 2px outline on focus (meets 3:1 contrast ratio)
 * - **4.1.2 Name, Role, Value**: Proper semantic HTML with accessible name
 * 
 * ### Keyboard Interactions
 * 
 * | Key | Action |
 * |-----|--------|
 * | **Enter** | Activates the link |
 * | **Tab** | Moves focus to the link |
 * | **Shift+Tab** | Moves focus away from the link |
 * 
 * ### Screen Reader Support
 * 
 * - Link role and name are announced automatically
 * - External links: "Link, external" announced (when \`external\` prop is true)
 * - Skip links: Properly announced for keyboard navigation
 * - Custom labels via \`aria-label\` prop for context-dependent links
 * 
 * ### Focus Management
 * 
 * - Focus indicators use 2px solid outline with 2px offset
 * - Focus styles respect \`prefers-reduced-motion\` media query
 * - High contrast mode supported via \`prefers-contrast\` media query
 * - Focus visible only on keyboard navigation (not mouse clicks) using \`:focus-visible\`
 * 
 * ## Best Practices
 * 
 * 1. **Use descriptive link text**: Avoid "click here" or "read more" - describe what the link does
 * 2. **Use external prop for external links**: Automatically adds security attributes
 * 3. **Provide aria-label for icon-only links**: Screen readers need context
 * 4. **Use skip links for main content**: Helps keyboard users navigate large pages
 * 5. **Don't use links for buttons**: Use Button component for actions, Link for navigation
 * 
 * ## Common Pitfalls
 * 
 * - Using generic link text like "click here" (screen readers lose context)
 * - Missing \`external\` prop on external links (security risk)
 * - Using links for actions instead of navigation (use Button component)
 * - Missing \`aria-label\` on icon-only links (screen readers can't understand purpose)
 * - Removing focus styles (breaks keyboard navigation visibility)
 * 
 * @component
 * @example
 * ```tsx
 * <Link href="/about" external>
 *   Learn more
 * </Link>
 * ```
 */
const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Link>

/**
 * Standard internal link for navigation within the application.
 */
export const Default: Story = {
  args: {
    href: '#',
    children: 'Link text',
  },
}

/**
 * External link that automatically adds security attributes (\`rel="noopener noreferrer"\`)
 * to prevent security vulnerabilities when opening links in new tabs.
 */
export const External: Story = {
  args: {
    href: 'https://example.com',
    external: true,
    children: 'External link',
  },
}

/**
 * Skip link for keyboard navigation. These links allow keyboard users to skip
 * repetitive navigation and jump directly to main content. Typically placed
 * at the top of the page and styled to be visible on focus.
 */
export const SkipLink: Story = {
  args: {
    href: '#main-content',
    skip: true,
    children: 'Skip to main content',
  },
}


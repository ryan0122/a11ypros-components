import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

/**
 * # Button Component
 * 
 * An accessible, WCAG 2.1/2.2 compliant button component with full keyboard support,
 * focus management, and ARIA attributes.
 * 
 * ## Usage
 * 
 * ```tsx
 * import { Button } from '@design-system/core'
 * 
 * function MyComponent() {
 *   return (
 *     <Button variant="primary" onClick={handleClick}>
 *       Submit Form
 *     </Button>
 *   )
 * }
 * ```
 * 
 * ## Variants
 * 
 * - **primary**: Main call-to-action buttons (default)
 * - **secondary**: Secondary actions that are important but not the primary action
 * - **ghost**: Subtle actions with no background, minimal styling
 * - **danger**: Destructive actions like delete, remove, or cancel operations
 * 
 * ## Sizes
 * 
 * - **sm**: Small buttons for compact UIs (height: 32px)
 * - **md**: Medium buttons for standard use (height: 40px) - default
 * - **lg**: Large buttons for prominent actions (height: 48px)
 * 
 * ## States
 * 
 * - **loading**: Shows a loading indicator and disables interaction. Automatically sets `aria-busy="true"`
 * - **disabled**: Prevents all interaction. Button appears visually dimmed and is announced as "disabled button" by screen readers
 * 
 * ## Accessibility
 * 
 * ### WCAG 2.1/2.2 Compliance
 * 
 * - **1.3.1 Info and Relationships**: Uses semantic `<button>` element
 * - **2.1.1 Keyboard**: Full keyboard support (Enter/Space activation)
 * - **2.4.7 Focus Visible**: Clear 2px outline on focus (meets 3:1 contrast ratio)
 * - **4.1.2 Name, Role, Value**: Proper ARIA attributes and semantic HTML
 * - **4.1.3 Status Messages**: Loading state announced via `aria-busy="true"`
 * 
 * ### Keyboard Interactions
 * 
 * | Key | Action |
 * |-----|--------|
 * | Enter | Activates the button |
 * | Space | Activates the button |
 * | Tab | Moves focus to the button |
 * | Shift+Tab | Moves focus away from the button |
 * 
 * ### Screen Reader Support
 * 
 * - Button role and name are announced automatically
 * - Loading state: "Busy" announced via `aria-busy="true"`
 * - Disabled state: "Disabled button" announced via `aria-disabled="true"`
 * - Custom labels via `aria-label` prop for icon-only buttons
 * - Loading spinner hidden from screen readers (`aria-hidden="true"`)
 * 
 * ### Focus Management
 * 
 * - Focus indicators use 2px solid outline with 2px offset
 * - Focus styles respect `prefers-reduced-motion` media query
 * - High contrast mode supported via `prefers-contrast` media query
 * - Focus visible only on keyboard navigation (not mouse clicks) using `:focus-visible`
 * 
 * ## Best Practices
 * 
 * 1. Always provide accessible text: Use `children` for visible text or `aria-label` for icon-only buttons
 * 2. Use appropriate variants: Primary for main actions (one per page/section), danger for destructive actions
 * 3. Handle loading states: Use `loading` prop instead of manually disabling during async operations
 * 4. Don't use buttons for navigation: Use the Link component for navigation instead
 * 5. Provide feedback: Don't disable buttons without explaining why or providing alternative actions
 * 
 * ## Common Pitfalls
 * 
 * - Using `<div onClick={...}>` instead of Button (loses keyboard support and semantic meaning)
 * - Missing `aria-label` on icon-only buttons (screen readers can't understand the action)
 * - Using `disabled` without providing feedback or alternative actions
 * - Not handling loading states during async operations (users don't know if action is processing)
 * - Using buttons for navigation (use Link component instead for proper semantics)
 * - Removing focus styles (breaks keyboard navigation visibility)
 * 
 * @component
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

/**
 * Primary buttons are used for the main call-to-action on a page or in a section.
 * They should be used sparingly - typically one per page or section.
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
}

/**
 * Secondary buttons are used for secondary actions that are important but not
 * the primary action. They provide visual hierarchy.
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
}

/**
 * Ghost buttons have no background and minimal styling. Use for tertiary actions
 * or when you want a more subtle appearance.
 */
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
}

/**
 * Danger buttons are used for destructive actions like delete, remove, or cancel
 * operations. They use red coloring to indicate the potentially harmful nature
 * of the action.
 */
export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Delete',
  },
}

/**
 * Buttons come in three sizes. Choose the size that fits your layout and
 * maintains visual hierarchy. Medium is the default size.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

/**
 * Loading state shows a spinner and disables the button. Use this during
 * async operations to provide feedback and prevent duplicate submissions.
 * The button automatically sets `aria-busy="true"` to announce the loading state.
 */
export const Loading: Story = {
  args: {
    loading: true,
    children: 'Saving...',
  },
}

/**
 * Disabled buttons cannot be interacted with. They appear visually dimmed
 * and are announced as "disabled button" by screen readers.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
}

/**
 * Icon-only buttons require an aria-label for accessibility. Without visible
 * text, screen readers need the aria-label to understand what the button does.
 */
export const WithAriaLabel: Story = {
  args: {
    'aria-label': 'Close dialog',
    children: '×',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
}

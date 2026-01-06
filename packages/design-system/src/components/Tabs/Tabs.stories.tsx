import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Tabs } from './Tabs'

/**
 * # Tabs Component
 * 
 * An accessible tabs component following the WAI-ARIA tabs pattern with full keyboard
 * navigation support and proper focus management.
 * 
 * ## Usage
 * 
 * ```tsx
 * import { Tabs } from '@design-system/core'
 * 
 * function MyComponent() {
 *   return (
 *     <Tabs
 *       aria-label="Settings tabs"
 *       items={[
 *         { id: 'general', label: 'General', content: <div>General content</div> },
 *         { id: 'account', label: 'Account', content: <div>Account content</div> },
 *       ]}
 *     />
 *   )
 * }
 * ```
 * 
 * ## Features
 * 
 * - **Arrow key navigation**: Navigate between tabs using arrow keys
 * - **Activation modes**: Automatic (arrow keys activate immediately) or manual (arrow keys move focus, Enter/Space activates)
 * - **Home/End support**: Jump to first or last tab
 * - **Orientation support**: Horizontal (default) or vertical layouts
 * - **ARIA tabs pattern**: Proper semantic structure and ARIA attributes
 * - **Focus management**: Focus moves to active tab panel content
 * 
 * ## Accessibility
 * 
 * ### WCAG 2.1/2.2 Compliance
 * 
 * - **2.1.1 Keyboard**: Full keyboard navigation with arrow keys, Home, and End
 * - **4.1.2 Name, Role, Value**: Proper ARIA tabs pattern with role="tablist", role="tab", role="tabpanel"
 * - **2.4.3 Focus Order**: Proper focus management between tabs and panels
 * - **2.4.7 Focus Visible**: Clear focus indicators on tab buttons
 * 
 * ### Keyboard Interactions
 * 
 * | Key | Action (Automatic) | Action (Manual) |
 * |-----|---------------------|-----------------|
 * | **Arrow Right/Down** | Move to next tab and activate | Move focus to next tab |
 * | **Arrow Left/Up** | Move to previous tab and activate | Move focus to previous tab |
 * | **Home** | Move to first tab and activate | Move focus to first tab |
 * | **End** | Move to last tab and activate | Move focus to last tab |
 * | **Enter/Space** | N/A | Activate focused tab |
 * | **Tab** | Move focus to tab panel content | Move focus to tab panel content |
 * | **Shift+Tab** | Move focus away from tabs | Move focus away from tabs |
 * 
 * ### Screen Reader Support
 * 
 * - Tab list role and label are announced
 * - Active tab is announced with "selected" state
 * - Tab panel content is associated with its tab
 * - Tab count and position are announced (e.g., "Tab 2 of 3")
 * 
 * ### Focus Management
 * 
 * - Focus moves to active tab when component mounts
 * - Arrow keys move focus between tabs
 * - Tab key moves focus into tab panel content
 * - Focus returns to tab when panel content loses focus
 * 
 * ## Best Practices
 * 
 * 1. **Provide aria-label**: Required for screen readers to understand tab purpose
 * 2. **Keep tab labels concise**: Short, descriptive labels work best
 * 3. **Use appropriate orientation**: Horizontal for most cases, vertical for sidebars
 * 4. **Limit tab count**: Too many tabs can be overwhelming (aim for 5-7 max)
 * 5. **Make content accessible**: Ensure tab panel content is keyboard navigable
 * 
 * ## Common Pitfalls
 * 
 * - Missing aria-label (screen readers can't understand tab purpose)
 * - Too many tabs (becomes hard to navigate)
 * - Non-keyboard accessible content in panels (breaks keyboard navigation)
 * - Not following ARIA tabs pattern (breaks screen reader support)
 * - Changing tab order dynamically (confuses keyboard users)
 * 
 * @component
 * @example
 * ```tsx
 * <Tabs
 *   aria-label="Settings"
 *   items={[
 *     { id: 'general', label: 'General', content: <SettingsForm /> },
 *     { id: 'advanced', label: 'Advanced', content: <AdvancedForm /> },
 *   ]}
 * />
 * ```
 */
const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Tabs>

/**
 * Horizontal tabs layout (default). Tabs are arranged in a row at the top,
 * with tab panels displayed below. Use for most common tab scenarios.
 */
export const Default: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState('general')
    
    return (
      <Tabs
        aria-label="Settings tabs"
        selectedId={selectedId}
        onSelectionChange={setSelectedId}
        items={[
          {
            id: 'general',
            label: 'General',
            content: <div>General settings content</div>,
          },
          {
            id: 'account',
            label: 'Account',
            content: <div>Account settings content</div>,
          },
          {
            id: 'privacy',
            label: 'Privacy',
            content: <div>Privacy settings content</div>,
          },
        ]}
      />
    )
  },
}

/**
 * Vertical tabs layout. Tabs are arranged in a column on the left side,
 * with tab panels displayed to the right. Use for sidebar navigation or
 * when you have many tabs that would overflow horizontally.
 */
export const Vertical: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState('tab1')
    
    return (
      <Tabs
        aria-label="Vertical tabs"
        orientation="vertical"
        selectedId={selectedId}
        onSelectionChange={setSelectedId}
        items={[
          {
            id: 'tab1',
            label: 'Tab 1',
            content: <div>Content 1</div>,
          },
          {
            id: 'tab2',
            label: 'Tab 2',
            content: <div>Content 2</div>,
          },
        ]}
      />
    )
  },
}

/**
 * Manual activation mode. Arrow keys move focus between tabs without activating them.
 * Press Enter or Space to activate the focused tab. This is useful when tab content
 * changes are expensive or when you want users to preview tabs before activating.
 */
export const ManualActivation: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState('general')
    
    return (
      <Tabs
        aria-label="Settings tabs with manual activation"
        activationMode="manual"
        selectedId={selectedId}
        onSelectionChange={setSelectedId}
        items={[
          {
            id: 'general',
            label: 'General',
            content: <div>General settings content</div>,
          },
          {
            id: 'account',
            label: 'Account',
            content: <div>Account settings content</div>,
          },
          {
            id: 'privacy',
            label: 'Privacy',
            content: <div>Privacy settings content</div>,
          },
        ]}
      />
    )
  },
}


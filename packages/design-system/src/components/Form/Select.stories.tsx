import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Select } from './Select'

/**
 * # Select Component
 * 
 * An accessible select dropdown component with proper label association, error handling,
 * and ARIA attributes. Supports keyboard navigation and screen reader announcements.
 * 
 * ## Usage
 * 
 * ```tsx
 * import { Select } from '@design-system/core'
 * 
 * function MyComponent() {
 *   const [value, setValue] = useState('')
 *   
 *   return (
 *     <Select
 *       label="Country"
 *       value={value}
 *       onChange={(e) => setValue(e.target.value)}
 *       options={[
 *         { value: 'us', label: 'United States' },
 *         { value: 'ca', label: 'Canada' },
 *         { value: 'uk', label: 'United Kingdom' },
 *       ]}
 *     />
 *   )
 * }
 * ```
 * 
 * ## Features
 * 
 * - **Label association**: Labels are properly associated with selects using \`htmlFor\` and \`id\`
 * - **Error handling**: Error messages are announced to screen readers via ARIA
 * - **Helper text**: Optional helper text for additional context
 * - **Placeholder option**: Optional placeholder text for the first option
 * - **Keyboard navigation**: Arrow keys navigate options, Enter selects
 * 
 * ## Accessibility
 * 
 * ### WCAG 2.1/2.2 Compliance
 * 
 * - **1.3.1 Info and Relationships**: Proper label-select association via \`htmlFor\` and \`id\`
 * - **2.1.1 Keyboard**: Full keyboard navigation with arrow keys and Enter
 * - **2.5.3 Label in Name**: Label text matches accessible name
 * - **4.1.2 Name, Role, Value**: Proper ARIA attributes including \`aria-required\`, \`aria-invalid\`, \`aria-describedby\`
 * 
 * ### Keyboard Interactions
 * 
 * | Key | Action |
 * |-----|--------|
 * | **Tab** | Moves focus to the select |
 * | **Shift+Tab** | Moves focus away from the select |
 * | **Arrow Up** | Move to previous option |
 * | **Arrow Down** | Move to next option |
 * | **Enter** | Open/close dropdown and select option |
 * | **Space** | Open/close dropdown |
 * | **Escape** | Close dropdown |
 * | **Home** | Move to first option |
 * | **End** | Move to last option |
 * 
 * ### Screen Reader Support
 * 
 * - Select role and label are announced when focused
 * - Selected option value is announced
 * - Required state is announced ("required")
 * - Error messages are announced when present
 * - Helper text is announced via \`aria-describedby\`
 * - Placeholder option is announced appropriately
 * 
 * ### Focus Management
 * 
 * - Focus indicators use 2px solid outline with 2px offset
 * - Focus styles respect \`prefers-reduced-motion\` media query
 * - Error state has distinct focus styling
 * - Focus visible only on keyboard navigation using \`:focus-visible\`
 * 
 * ## Best Practices
 * 
 * - **Always provide a label**: Required for accessibility and usability
 * - **Use for 5+ options**: Select is ideal for longer lists (use Radio for 2-4 options)
 * - **Provide helpful error messages**: Be specific about what needs to be selected
 * - **Use placeholder for guidance**: Help users understand what to select
 * - **Group related options**: Use optgroups for logical grouping when appropriate
 * 
 * ## Common Pitfalls
 * 
 * - Missing label (screen readers can't identify the select)
 * - Using select for 2-3 options (use Radio buttons instead)
 * - Vague error messages (be specific about validation failures)
 * - Not providing a placeholder (users don't know what to select)
 * - Too many options without grouping (becomes hard to navigate)
 * 
 * @component
 * @example
 * ```tsx
 * <Select
 *   label="Country"
 *   value={country}
 *   onChange={(e) => setCountry(e.target.value)}
 *   options={countries}
 *   required
 *   error={errors.country}
 * />
 * ```
 */
const meta: Meta<typeof Select> = {
  title: 'Components/Form/Select',
  component: Select,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Select>

/**
 * Standard select dropdown with multiple options. The label is properly associated
 * with the select for screen readers and clicking the label focuses the select.
 */
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Select
        id="select-default"
        label="Choose a country"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        options={[
          { value: 'us', label: 'United States' },
          { value: 'ca', label: 'Canada' },
          { value: 'uk', label: 'United Kingdom' },
          { value: 'au', label: 'Australia' },
        ]}
      />
    )
  },
}

/**
 * Select with placeholder option. The placeholder helps users understand
 * what to select and is typically not a valid selection option.
 */
export const WithPlaceholder: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Select
        id="select-placeholder"
        label="Payment method"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Select a payment method"
        options={[
          { value: 'credit', label: 'Credit Card' },
          { value: 'paypal', label: 'PayPal' },
          { value: 'bank', label: 'Bank Transfer' },
        ]}
      />
    )
  },
}

/**
 * Select with error message. Error messages are announced to screen readers
 * and displayed visually below the select. The select is marked as invalid
 * with \`aria-invalid="true"\`.
 */
export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Select
        id="select-error"
        label="Country"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        error="Please select a country"
        options={[
          { value: 'us', label: 'United States' },
          { value: 'ca', label: 'Canada' },
          { value: 'uk', label: 'United Kingdom' },
        ]}
      />
    )
  },
}

/**
 * Select with helper text. Helper text provides additional context or guidance
 * and is associated with the select via \`aria-describedby\`.
 */
export const WithHelperText: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Select
        id="select-helper"
        label="Shipping method"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        helperText="Standard shipping takes 3-5 business days"
        options={[
          { value: 'standard', label: 'Standard (Free)' },
          { value: 'express', label: 'Express ($10)' },
          { value: 'overnight', label: 'Overnight ($25)' },
        ]}
      />
    )
  },
}

/**
 * Required select field. Required selects are marked with \`aria-required="true"\`
 * and display a visual indicator (asterisk) next to the label.
 */
export const Required: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Select
        id="select-required"
        label="State"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        placeholder="Select a state"
        options={[
          { value: 'ca', label: 'California' },
          { value: 'ny', label: 'New York' },
          { value: 'tx', label: 'Texas' },
        ]}
      />
    )
  },
}

/**
 * Disabled select that cannot be changed. Disabled selects are announced as
 * "disabled" by screen readers and appear visually dimmed.
 */
export const Disabled: Story = {
  args: {
    id: 'select-disabled',
    label: 'Disabled select',
    disabled: true,
    value: 'option1',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ],
  },
}

/**
 * Select with many options. For long lists, consider grouping related options
 * or using a searchable select component for better usability.
 */
export const ManyOptions: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Select
        id="select-many"
        label="Choose a city"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Select a city"
        options={[
          { value: 'ny', label: 'New York' },
          { value: 'la', label: 'Los Angeles' },
          { value: 'ch', label: 'Chicago' },
          { value: 'ho', label: 'Houston' },
          { value: 'ph', label: 'Phoenix' },
          { value: 'ph2', label: 'Philadelphia' },
          { value: 'sa', label: 'San Antonio' },
          { value: 'sd', label: 'San Diego' },
          { value: 'da', label: 'Dallas' },
          { value: 'sj', label: 'San Jose' },
        ]}
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Select with many options. For very long lists (20+ options), consider using a searchable select or grouping options.',
      },
    },
  },
}


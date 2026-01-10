import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Radio } from './Radio'

/**
 * # Radio Component
 * 
 * An accessible radio group component for selecting a single option from multiple choices.
 * Uses proper fieldset/legend structure and ARIA attributes following WAI-ARIA best practices.
 * 
 * ## Usage
 * 
 * ```tsx
 * import { Radio } from '@a11ypros/a11y-ui-components'
 * 
 * function MyComponent() {
 *   const [value, setValue] = useState('')
 *   
 *   return (
 *     <Radio
 *       name="payment"
 *       label="Payment method"
 *       value={value}
 *       onChange={(e) => setValue(e.target.value)}
 *       options={[
 *         { value: 'credit', label: 'Credit card' },
 *         { value: 'paypal', label: 'PayPal' },
 *         { value: 'bank', label: 'Bank transfer' },
 *       ]}
 *     />
 *   )
 * }
 * ```
 * 
 * ## Features
 * 
 * - **Radio group**: Properly groups radio buttons with shared \`name\` attribute
 * - **Fieldset structure**: Uses semantic fieldset/legend for grouping
 * - **Error handling**: Error messages are announced to screen readers via ARIA
 * - **Helper text**: Optional helper text for additional context
 * - **Keyboard navigation**: Arrow keys navigate between options
 * 
 * ## Accessibility
 * 
 * ### WCAG 2.1/2.2 Compliance
 * 
 * - **1.3.1 Info and Relationships**: Proper fieldset/legend structure for grouping
 * - **2.1.1 Keyboard**: Full keyboard navigation with arrow keys
 * - **2.5.3 Label in Name**: Label text matches accessible name
 * - **4.1.2 Name, Role, Value**: Proper ARIA attributes including \`aria-required\`, \`aria-invalid\`
 * 
 * ### Keyboard Interactions
 * 
 * | Key | Action |
 * |-----|--------|
 * | **Tab** | Moves focus to the radio group |
 * | **Shift+Tab** | Moves focus away from the radio group |
 * | **Arrow Up/Left** | Move to previous option |
 * | **Arrow Down/Right** | Move to next option |
 * | **Space** | Select focused option |
 * 
 * ### Screen Reader Support
 * 
 * - Fieldset legend is announced when entering the group
 * - Each option's label is announced when focused
 * - Selected state is announced ("selected" or "not selected")
 * - Required state is announced ("required")
 * - Error messages are announced when present
 * - Helper text is announced via \`aria-describedby\`
 * 
 * ### Focus Management
 * 
 * - Focus indicators use 2px solid outline with 2px offset
 * - Focus styles respect \`prefers-reduced-motion\` media query
 * - Error state has distinct focus styling
 * - Arrow keys move focus between radio options
 * 
 * ## Best Practices
 * 
 * 1. **Always provide a label**: Required for accessibility and usability
 * 2. **Use for single choice**: Radio buttons are for selecting one option from multiple choices
 * 3. **Group with fieldset**: Component automatically uses fieldset/legend structure
 * 4. **Provide helpful error messages**: Be specific about what needs to be selected
 * 5. **Use descriptive option labels**: Make it clear what each option means
 * 
 * ## Common Pitfalls
 * 
 * - Missing label (screen readers can't identify the radio group purpose)
 * - Using radio for multiple selections (use Checkbox for independent choices)
 * - Not providing a default selection (can confuse users)
 * - Vague error messages (be specific about validation failures)
 * - Too many options (consider using Select for 5+ options)
 * 
 * @component
 * @example
 * ```tsx
 * <Radio
 *   name="size"
 *   label="T-shirt size"
 *   value={selectedSize}
 *   onChange={(e) => setSelectedSize(e.target.value)}
 *   options={[
 *     { value: 's', label: 'Small' },
 *     { value: 'm', label: 'Medium' },
 *     { value: 'l', label: 'Large' },
 *   ]}
 * />
 * ```
 */
const meta: Meta<typeof Radio> = {
  title: 'Components/Form/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Custom class name for the radio button',
      table: {
        type: { summary: 'string' },
      }
    },
  },
}

export default meta
type Story = StoryObj<typeof Radio>

/**
 * Standard radio group with multiple options. Users can select one option
 * using arrow keys or by clicking. The component uses proper fieldset/legend structure.
 */
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Radio
        name="radio-default"
        label="Choose a size"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        options={[
          { value: 'small', label: 'Small' },
          { value: 'medium', label: 'Medium' },
          { value: 'large', label: 'Large' },
        ]}
      />
    )
  },
}

/**
 * Radio group with error message. Error messages are announced to screen readers
 * and displayed visually below the group. The group is marked as invalid.
 */
export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Radio
        name="radio-error"
        label="Select a payment method"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        error="Please select a payment method"
        options={[
          { value: 'credit', label: 'Credit card' },
          { value: 'paypal', label: 'PayPal' },
          { value: 'bank', label: 'Bank transfer' },
        ]}
      />
    )
  },
}

/**
 * Radio group with helper text. Helper text provides additional context or guidance
 * and is associated with the group via \`aria-describedby\`.
 */
export const WithHelperText: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Radio
        name="radio-helper"
        label="Delivery speed"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        helperText="Standard delivery takes 3-5 business days"
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
 * Required radio group. Required groups are marked with \`aria-required="true"\`
 * and display a visual indicator (asterisk) next to the label.
 */
export const Required: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Radio
        name="radio-required"
        label="Select an option"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
        ]}
      />
    )
  },
}

/**
 * Radio group with a pre-selected option. Shows the component with a default value selected.
 */
export const WithDefaultValue: Story = {
  render: () => {
    const [value, setValue] = useState('medium')
    return (
      <Radio
        name="radio-default-value"
        label="Choose a size"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        options={[
          { value: 'small', label: 'Small' },
          { value: 'medium', label: 'Medium' },
          { value: 'large', label: 'Large' },
        ]}
      />
    )
  },
}

/**
 * Radio group with disabled options. Individual options can be disabled
 * while keeping others enabled.
 */
export const WithDisabledOptions: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Radio
        name="radio-disabled"
        label="Select plan"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        options={[
          { value: 'basic', label: 'Basic Plan' },
          { value: 'pro', label: 'Pro Plan' },
          { value: 'enterprise', label: 'Enterprise Plan', disabled: true },
        ]}
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Some options can be disabled while keeping others selectable. Disabled options are announced as "disabled" by screen readers.',
      },
    },
  },
}


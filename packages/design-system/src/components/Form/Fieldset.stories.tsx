import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Fieldset } from './Fieldset'
import { Input } from './Input'
import { Checkbox } from './Checkbox'
import { Radio } from './Radio'

/**
 * # Fieldset Component
 * 
 * An accessible fieldset component for grouping related form controls. Uses semantic
 * HTML fieldset/legend structure to provide context for screen readers.
 * 
 * ## Usage
 * 
 * ```tsx
 * import { Fieldset, Input } from '@design-system/core'
 * 
 * function MyComponent() {
 *   return (
 *     <Fieldset legend="Shipping Address">
 *       <Input label="Street" />
 *       <Input label="City" />
 *       <Input label="Zip Code" />
 *     </Fieldset>
 *   )
 * }
 * ```
 * 
 * ## Features
 * 
 * - **Semantic grouping**: Uses proper \`<fieldset>\` and \`<legend>\` elements
 * - **Visual legend**: Legend text provides context for the grouped fields
 * - **Hidden legend**: Option to hide legend visually while keeping it accessible
 * - **Required indicator**: Shows asterisk when fieldset contains required fields
 * 
 * ## Accessibility
 * 
 * ### WCAG 2.1/2.2 Compliance
 * 
 * - **1.3.1 Info and Relationships**: Proper fieldset/legend structure for grouping related controls
 * - **4.1.2 Name, Role, Value**: Proper semantic HTML with fieldset role
 * 
 * ### Screen Reader Support
 * 
 * - Fieldset legend is announced when entering the group
 * - Provides context for all form controls within the fieldset
 * - Required state is announced when fieldset contains required fields
 * - Hidden legend is still announced to screen readers
 * 
 * ## Best Practices
 * 
 * 1. **Always provide a legend**: Required for accessibility - describes what the group is for
 * 2. **Group related fields**: Use fieldsets to group logically related form controls
 * 3. **Use for radio/checkbox groups**: Essential for grouping radio buttons and checkboxes
 * 4. **Keep legends concise**: Short, descriptive legends work best
 * 5. **Don't nest fieldsets**: Avoid nesting fieldsets within fieldsets
 * 
 * ## Common Pitfalls
 * 
 * - Missing legend (screen readers lose context for grouped fields)
 * - Using div instead of fieldset (loses semantic meaning)
 * - Nesting fieldsets (can confuse screen readers)
 * - Too verbose legends (keep them concise)
 * - Not using for radio/checkbox groups (required for proper grouping)
 * 
 * @component
 * @example
 * ```tsx
 * <Fieldset legend="Contact Information">
 *   <Input label="Email" type="email" required />
 *   <Input label="Phone" type="tel" />
 * </Fieldset>
 * ```
 */
const meta: Meta<typeof Fieldset> = {
  title: 'Components/Form/Fieldset',
  component: Fieldset,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Fieldset>

/**
 * Standard fieldset with visible legend. Groups related form controls
 * and provides context through the legend text.
 */
export const Default: Story = {
  render: () => (
    <Fieldset legend="Shipping Address">
      <Input label="Street address" id="street" />
      <Input label="City" id="city" />
      <Input label="Zip code" id="zip" />
    </Fieldset>
  ),
}

/**
 * Fieldset with required fields. The required indicator (asterisk) appears
 * next to the legend when the fieldset contains required fields.
 */
export const WithRequiredFields: Story = {
  render: () => (
    <Fieldset legend="Personal Information" required>
      <Input label="First name" id="first-name" required />
      <Input label="Last name" id="last-name" required />
      <Input label="Email" id="email" type="email" required />
    </Fieldset>
  ),
}

/**
 * Fieldset with hidden legend. The legend is visually hidden but still
 * announced to screen readers, useful when visual grouping is clear.
 */
export const HiddenLegend: Story = {
  render: () => (
    <Fieldset legend="Billing Information" legendHidden>
      <Input label="Card number" id="card" />
      <Input label="Expiry date" id="expiry" />
      <Input label="CVV" id="cvv" />
    </Fieldset>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Legend is visually hidden but still accessible to screen readers. Use when visual grouping is obvious but you want to maintain semantic structure.',
      },
    },
  },
}

/**
 * Fieldset grouping radio buttons. Essential for proper semantic grouping
 * of radio button groups.
 */
export const WithRadioButtons: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Fieldset legend="Choose a size">
        <Radio
          name="size"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          options={[
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' },
          ]}
        />
      </Fieldset>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Fieldset is essential for grouping radio buttons. The Radio component uses fieldset internally, but you can wrap multiple radio groups in a fieldset for higher-level grouping.',
      },
    },
  },
}

/**
 * Fieldset grouping checkboxes. Groups related checkboxes together
 * for better semantic structure.
 */
export const WithCheckboxes: Story = {
  render: () => {
    const [preferences, setPreferences] = useState({
      email: false,
      sms: false,
      push: false,
    })

    return (
      <Fieldset legend="Notification Preferences">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Checkbox
          id="pref-email"
          label="Email notifications"
          checked={preferences.email}
          onChange={(e) => setPreferences((prev) => ({ ...prev, email: e.target.checked }))}
        />
        <Checkbox
          id="pref-sms"
          label="SMS notifications"
          checked={preferences.sms}
          onChange={(e) => setPreferences((prev) => ({ ...prev, sms: e.target.checked }))}
        />
        <Checkbox
          id="pref-push"
          label="Push notifications"
          checked={preferences.push}
          onChange={(e) => setPreferences((prev) => ({ ...prev, push: e.target.checked }))}
        />
        </div>
      </Fieldset>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Fieldset groups related checkboxes together, providing context about what the checkboxes are for.',
      },
    },
  },
}


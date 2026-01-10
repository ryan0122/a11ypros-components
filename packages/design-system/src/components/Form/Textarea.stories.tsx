import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Textarea } from './Textarea'

/**
 * # Textarea Component
 * 
 * An accessible textarea component with proper label association, error handling,
 * character counting, and ARIA attributes. Ideal for multi-line text input.
 * 
 * ## Usage
 * 
 * ```tsx
 * import { Textarea } from '@a11ypros/a11y-ui-components'
 * 
 * function MyComponent() {
 *   return (
 *     <Textarea
 *       label="Message"
 *       placeholder="Enter your message"
 *       maxLength={500}
 *       showCount
 *     />
 *   )
 * }
 * ```
 * 
 * ## Features
 * 
 * - **Label association**: Labels are properly associated with textareas using \`htmlFor\` and \`id\`
 * - **Error handling**: Error messages are announced to screen readers via ARIA
 * - **Helper text**: Optional helper text for additional context
 * - **Character counting**: Optional character count display with \`maxLength\` support
 * - **Auto-resize**: Can be configured to grow with content
 * 
 * ## Accessibility
 * 
 * ### WCAG 2.1/2.2 Compliance
 * 
 * - **1.3.1 Info and Relationships**: Proper label-textarea association via \`htmlFor\` and \`id\`
 * - **4.1.2 Name, Role, Value**: Proper ARIA attributes including \`aria-required\`, \`aria-invalid\`, \`aria-describedby\`
 * - **4.1.3 Status Messages**: Error messages and character count announced to screen readers
 * 
 * ### Keyboard Interactions
 * 
 * | Key | Action |
 * |-----|--------|
 * | **Tab** | Moves focus to the textarea |
 * | **Shift+Tab** | Moves focus away from the textarea |
 * | **Enter** | Creates new line (does not submit form) |
 * | **Arrow keys** | Navigate within text content |
 * 
 * ### Screen Reader Support
 * 
 * - Textarea role and label are announced when focused
 * - Character count is announced when \`showCount\` is enabled
 * - Required state is announced ("required")
 * - Error messages are announced when present
 * - Helper text is announced via \`aria-describedby\`
 * - Max length is announced when \`maxLength\` is set
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
 * 1. **Always provide a label**: Required for accessibility and usability
 * 2. **Use for multi-line input**: Textarea is for longer, multi-line text (use Input for single-line)
 * 3. **Set appropriate maxLength**: Helps users understand constraints
 * 4. **Provide helpful error messages**: Be specific about validation failures
 * 5. **Use helper text for guidance**: Help users understand what to enter
 * 
 * ## Common Pitfalls
 * 
 * - Missing label (screen readers can't identify the textarea)
 * - Using textarea for single-line input (use Input component instead)
 * - Not setting maxLength when needed (users don't know limits)
 * - Vague error messages (be specific about validation failures)
 * - Too small initial size (hard to see what you're typing)
 * 
 * @component
 * @example
 * ```tsx
 * <Textarea
 *   label="Feedback"
 *   maxLength={500}
 *   showCount
 *   required
 *   error={errors.feedback}
 *   helperText="Please provide detailed feedback"
 * />
 * ```
 */
const meta: Meta<typeof Textarea> = {
  title: 'Components/Form/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Custom class name for the textarea',
      table: {
        type: { summary: 'string' },
      }
    },
  },
}

export default meta
type Story = StoryObj<typeof Textarea>

/**
 * Standard textarea with label and placeholder. The label is properly associated
 * with the textarea for screen readers and clicking the label focuses the textarea.
 */
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Textarea
        id="textarea-default"
        label="Message"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter your message here..."
      />
    )
  },
}

/**
 * Textarea with character count. Shows remaining characters when \`maxLength\`
 * and \`showCount\` are set. The count is announced to screen readers.
 */
export const WithCharacterCount: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Textarea
        id="textarea-count"
        label="Description"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={200}
        showCount
        placeholder="Enter a description (max 200 characters)"
      />
    )
  },
}

/**
 * Textarea with error message. Error messages are announced to screen readers
 * and displayed visually below the textarea. The textarea is marked as invalid
 * with \`aria-invalid="true"\`.
 */
export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Textarea
        id="textarea-error"
        label="Comments"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        error="Please enter at least 10 characters"
        maxLength={500}
        showCount
      />
    )
  },
}

/**
 * Textarea with helper text. Helper text provides additional context or guidance
 * and is associated with the textarea via \`aria-describedby\`.
 */
export const WithHelperText: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Textarea
        id="textarea-helper"
        label="Additional notes"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        helperText="Include any additional information that might be helpful"
        maxLength={1000}
        showCount
      />
    )
  },
}

/**
 * Required textarea field. Required textareas are marked with \`aria-required="true"\`
 * and display a visual indicator (asterisk) next to the label.
 */
export const Required: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Textarea
        id="textarea-required"
        label="Bio"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        maxLength={500}
        showCount
        placeholder="Tell us about yourself"
      />
    )
  },
}

/**
 * Disabled textarea that cannot be edited. Disabled textareas are announced as
 * "disabled" by screen readers and appear visually dimmed.
 */
export const Disabled: Story = {
  args: {
    id: 'textarea-disabled',
    label: 'Disabled textarea',
    disabled: true,
    defaultValue: 'This textarea cannot be edited',
  },
}

/**
 * Large textarea for longer content. Use appropriate rows and cols attributes
 * to provide a good initial size for the content type.
 */
export const Large: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <Textarea
        id="textarea-large"
        label="Full article"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={10}
        maxLength={5000}
        showCount
        placeholder="Write your article here..."
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Large textarea with more rows for longer content. Adjust rows and cols to fit your use case.',
      },
    },
  },
}


import type { Meta, StoryObj } from '@storybook/react'
import { Label } from './Label'
import { Input } from './Input'

/**
 * # Label Component
 * 
 * An accessible label component for associating labels with form controls.
 * Properly implements the label-input relationship required for accessibility.
 * 
 * ## Usage
 * 
 * ```tsx
 * import { Label, Input } from '@design-system/core'
 * 
 * function MyComponent() {
 *   return (
 *     <>
 *       <Label htmlFor="email" required>
 *         Email address
 *       </Label>
 *       <Input id="email" type="email" />
 *     </>
 *   )
 * }
 * ```
 * 
 * ## Features
 * 
 * - **Input association**: Uses \`htmlFor\` to associate with input \`id\`
 * - **Required indicator**: Shows asterisk for required fields
 * - **Clickable**: Clicking label focuses associated input
 * - **Semantic HTML**: Uses proper \`<label>\` element
 * 
 * ## Accessibility
 * 
 * ### WCAG 2.1/2.2 Compliance
 * 
 * - **1.3.1 Info and Relationships**: Proper label-input association via \`htmlFor\` and \`id\`
 * - **2.5.3 Label in Name**: Label text matches accessible name
 * - **4.1.2 Name, Role, Value**: Proper semantic HTML with label role
 * 
 * ### Screen Reader Support
 * 
 * - Label text is announced when associated input receives focus
 * - Required indicator is announced ("required")
 * - Clicking label focuses the associated input
 * - Label provides context for form controls
 * 
 * ## Best Practices
 * 
 * 1. **Always associate with input**: Use \`htmlFor\` to link label to input \`id\`
 * 2. **Use descriptive text**: Label should clearly describe what the input is for
 * 3. **Mark required fields**: Use \`required\` prop to show visual indicator
 * 4. **Keep labels concise**: Short, clear labels are most effective
 * 5. **Don't use placeholder as label**: Placeholders disappear and aren't reliable
 * 
 * ## Common Pitfalls
 * 
 * - Missing \`htmlFor\` attribute (label not associated with input)
 * - Using placeholder instead of label (placeholders disappear)
 * - Vague label text (doesn't help users understand what to enter)
 * - Not marking required fields (users don't know what's mandatory)
 * - Using div or span instead of label (loses semantic meaning and click behavior)
 * 
 * @component
 * @example
 * ```tsx
 * <Label htmlFor="email" required>
 *   Email address
 * </Label>
 * <Input id="email" type="email" />
 * ```
 */
const meta: Meta<typeof Label> = {
  title: 'Components/Form/Label',
  component: Label,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Label>

/**
 * Standard label associated with an input. Clicking the label
 * focuses the associated input, improving usability.
 */
export const Default: Story = {
  render: () => (
    <>
      <Label htmlFor="input-default">Email address</Label>
      <Input id="input-default" type="email" />
    </>
  ),
}

/**
 * Required label with asterisk indicator. The asterisk is announced
 * as "required" by screen readers and provides visual indication.
 */
export const Required: Story = {
  render: () => (
    <>
      <Label htmlFor="input-required" required>
        Full name
      </Label>
      <Input id="input-required" required />
    </>
  ),
}

/**
 * Label without associated input (standalone). While less common,
 * labels can be used for other purposes, but typically should be
 * associated with a form control.
 */
export const Standalone: Story = {
  args: {
    children: 'Form section title',
  },
  parameters: {
    docs: {
      description: {
        story: 'Standalone label (not recommended). Labels should typically be associated with form controls using htmlFor.',
      },
    },
  },
}


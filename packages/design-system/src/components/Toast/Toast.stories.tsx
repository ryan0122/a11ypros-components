import type { Meta, StoryObj } from '@storybook/react'
import { ToastProvider, useToast } from './ToastProvider'
import { Button } from '../Button/Button'

/**
 * # Toast Component
 * 
 * An accessible toast notification system with ARIA live regions for screen reader
 * announcements. Provides non-intrusive feedback for user actions.
 * 
 * ## Usage
 * 
 * ```tsx
 * import { ToastProvider, useToast } from '@a11ypros/a11y-ui-components'
 * 
 * function MyComponent() {
 *   const { addToast } = useToast()
 *   
 *   const handleSave = async () => {
 *     await saveData()
 *     addToast({
 *       message: 'Data saved successfully',
 *       type: 'success'
 *     })
 *   }
 *   
 *   return <Button onClick={handleSave}>Save</Button>
 * }
 * 
 * // Wrap your app with ToastProvider
 * function App() {
 *   return (
 *     <ToastProvider>
 *       <MyComponent />
 *     </ToastProvider>
 *   )
 * }
 * ```
 * 
 * ## Toast Types
 * 
 * - **info**: Informational messages (blue)
 * - **success**: Success confirmations (green)
 * - **warning**: Warning messages (yellow/orange)
 * - **error**: Error messages (red)
 * 
 * ## Features
 * 
 * - **ARIA live regions**: Automatically announces to screen readers
 * - **Auto-dismiss**: Toasts automatically disappear after a timeout
 * - **Keyboard dismissible**: ESC key closes all toasts
 * - **Multiple toasts**: Can display multiple toasts simultaneously
 * - **Accessible close button**: Each toast has a close button with proper ARIA labels
 * 
 * ## Accessibility
 * 
 * ### WCAG 2.1/2.2 Compliance
 * 
 * - **4.1.3 Status Messages**: ARIA live region announcements for screen readers
 * - **2.1.1 Keyboard**: ESC key support to dismiss toasts
 * - **4.1.2 Name, Role, Value**: Proper ARIA attributes and semantic HTML
 * - **2.4.7 Focus Visible**: Clear focus indicators on close buttons
 * 
 * ### Keyboard Interactions
 * 
 * | Key | Action |
 * |-----|--------|
 * | **ESC** | Closes all visible toasts |
 * | **Tab** | Moves focus to toast close button |
 * | **Enter/Space** | Activates close button |
 * 
 * ### Screen Reader Support
 * 
 * - Toast messages are announced via ARIA live regions
 * - Live region politeness: "polite" for info/success, "assertive" for warnings/errors
 * - Close button has accessible label ("Close notification")
 * - Toast type is included in announcement when relevant
 * 
 * ### Focus Management
 * 
 * - Focus moves to close button when toast appears (optional, can be configured)
 * - Focus returns to previous element when toast closes
 * - Toasts don't trap focus (unlike modals)
 * 
 * ## Best Practices
 * 
 * 1. **Use appropriate types**: Match toast type to message severity
 * 2. **Keep messages concise**: Short, clear messages are more effective
 * 3. **Don't overuse**: Too many toasts can be overwhelming
 * 4. **Provide context**: Include enough information for users to understand the message
 * 5. **Handle errors gracefully**: Use error toasts for user-facing errors, not technical details
 * 
 * ## Common Pitfalls
 * 
 * - Using toasts for critical information (use modals for important confirmations)
 * - Too many toasts at once (can overwhelm users)
 * - Vague messages (be specific about what happened)
 * - Missing ToastProvider wrapper (toasts won't work without it)
 * - Using wrong toast type (confuses users about message severity)
 * 
 * @component
 * @example
 * ```tsx
 * const { addToast } = useToast()
 * 
 * addToast({
 *   message: 'Settings saved',
 *   type: 'success'
 * })
 * ```
 */
const meta: Meta<typeof ToastProvider> = {
  title: 'Components/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Custom class name for the toast',
      table: {
        type: { summary: 'string' },
      }
    },
  },
}

export default meta
type Story = StoryObj<typeof ToastProvider>

const ToastDemo = () => {
  const { addToast } = useToast()

  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button onClick={() => addToast({ message: 'Info message', type: 'info' })}>
        Show Info
      </Button>
      <Button onClick={() => addToast({ message: 'Success!', type: 'success' })}>
        Show Success
      </Button>
      <Button onClick={() => addToast({ message: 'Warning message', type: 'warning' })}>
        Show Warning
      </Button>
      <Button onClick={() => addToast({ message: 'Error occurred', type: 'error' })}>
        Show Error
      </Button>
    </div>
  )
}

/**
 * Toast notification system with all four types: info, success, warning, and error.
 * Each toast type has distinct styling and appropriate ARIA live region politeness.
 */
export const Default: Story = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
}


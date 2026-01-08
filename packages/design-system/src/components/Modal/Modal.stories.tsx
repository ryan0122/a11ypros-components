import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Modal } from './Modal'
import { Button } from '../Button/Button'

/**
 * # Modal Component
 * 
 * An accessible modal dialog component with focus trapping, keyboard support,
 * and proper ARIA attributes following the WAI-ARIA modal pattern.
 * 
 * ## Usage
 * 
 * ```tsx
 * import { Modal } from '@a11ypros/a11y-ui-components'
 * import { useState } from 'react'
 * 
 * function MyComponent() {
 *   const [isOpen, setIsOpen] = useState(false)
 *   
 *   return (
 *     <>
 *       <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
 *       <Modal
 *         isOpen={isOpen}
 *         onClose={() => setIsOpen(false)}
 *         title="Modal Title"
 *       >
 *         <p>Modal content goes here</p>
 *       </Modal>
 *     </>
 *   )
 * }
 * ```
 * 
 * ## Features
 * 
 * - **Focus trapping**: Focus is trapped within the modal when open
 * - **Focus return**: Focus returns to the trigger element when modal closes
 * - **Keyboard support**: ESC key closes the modal
 * - **Backdrop click**: Optional backdrop click to close
 * - **Portal rendering**: Rendered in a portal to avoid z-index issues
 * - **Multiple sizes**: sm, md, lg, and full screen options
 * 
 * ## Accessibility
 * 
 * ### WCAG 2.1/2.2 Compliance
 * 
 * - **2.1.1 Keyboard**: ESC key support, full keyboard navigation
 * - **2.1.2 No Keyboard Trap**: Focus returns to trigger element when modal closes
 * - **2.4.3 Focus Order**: Focus trapped within modal, proper tab order
 * - **2.4.7 Focus Visible**: Clear focus indicators on all interactive elements
 * - **4.1.2 Name, Role, Value**: Proper ARIA modal pattern with role="dialog"
 * - **4.1.3 Status Messages**: Modal title announced when opened
 * 
 * ### Keyboard Interactions
 * 
 * | Key | Action |
 * |-----|--------|
 * | **ESC** | Closes the modal |
 * | **Tab** | Moves focus to next focusable element (trapped within modal) |
 * | **Shift+Tab** | Moves focus to previous focusable element (wraps at boundaries) |
 * | **Enter/Space** | Activates buttons or links within modal |
 * 
 * ### Screen Reader Support
 * 
 * - Modal role and title are announced when opened
 * - Focus moves to modal content automatically
 * - Backdrop is hidden from screen readers (\`aria-hidden="true"\`)
 * - Close button has accessible label
 * - Focus returns to trigger element when closed
 * 
 * ### Focus Management
 * 
 * - Focus is trapped within modal when open (cannot tab to background content)
 * - Focus moves to first focusable element when modal opens
 * - Focus returns to trigger element when modal closes
 * - Backdrop receives focus trap but is not focusable itself
 * 
 * ## Best Practices
 * 
 * 1. **Always provide a title**: Required for accessibility and user understanding
 * 2. **Provide a close mechanism**: Close button, ESC key, or backdrop click
 * 3. **Return focus appropriately**: Focus should return to the element that opened the modal
 * 4. **Keep content focused**: Don't put too much content in modals - use pages for complex flows
 * 5. **Handle mobile**: Ensure modal is usable on mobile devices with proper sizing
 * 
 * ## Common Pitfalls
 * 
 * - Missing title prop (required for accessibility)
 * - Not returning focus to trigger element (breaks keyboard navigation flow)
 * - Allowing focus to escape modal (should be trapped)
 * - Using modals for non-modal content (use regular pages or sections)
 * - Too much content in modal (makes it hard to navigate)
 * - Missing close button or ESC key support
 * 
 * @component
 * @example
 * ```tsx
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirm Action"
 * >
 *   <p>Are you sure you want to proceed?</p>
 * </Modal>
 * ```
 */
const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Modal>

const ModalExample = (args: any) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

/**
 * Default modal with standard size. Focus is trapped within the modal
 * and returns to the trigger button when closed.
 */
export const Default: Story = {
  render: ModalExample,
  args: {
    title: 'Modal Title',
    children: <p>This is the modal content. Press ESC to close.</p>,
  },
}

/**
 * Small modal for simple confirmations or brief messages.
 * Use when you need a compact dialog that doesn't take up much screen space.
 */
export const Small: Story = {
  render: ModalExample,
  args: {
    title: 'Small Modal',
    size: 'sm',
    children: <p>This is a small modal.</p>,
  },
}

/**
 * Large modal for more complex content that needs more space.
 * Use when displaying forms, detailed information, or multiple sections.
 */
export const Large: Story = {
  render: ModalExample,
  args: {
    title: 'Large Modal',
    size: 'lg',
    children: <p>This is a large modal with more content.</p>,
  },
}


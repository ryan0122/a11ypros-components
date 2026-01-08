'use client'

import { ToastProvider, useToast } from '@a11ypros/a11y-ui-components'
import { Button } from '@a11ypros/a11y-ui-components'

function ToastDemo() {
  const { addToast } = useToast()

  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button onClick={() => addToast({ message: 'Info message', type: 'info' })}>
        Show Info Toast
      </Button>
      <Button onClick={() => addToast({ message: 'Success!', type: 'success' })}>
        Show Success Toast
      </Button>
      <Button onClick={() => addToast({ message: 'Warning message', type: 'warning' })}>
        Show Warning Toast
      </Button>
      <Button onClick={() => addToast({ message: 'Error occurred', type: 'error' })}>
        Show Error Toast
      </Button>
    </div>
  )
}

export default function ToastPage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Toast Component</h1>
      <p>Accessible toast notifications with ARIA live regions.</p>
      
      <section style={{ marginTop: '2rem' }}>
        <h2>Examples</h2>
        <ToastProvider>
          <ToastDemo />
        </ToastProvider>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Accessibility</h2>
        <ul>
          <li>WCAG 4.1.3 Status Messages: ARIA live region announcements</li>
          <li>WCAG 2.1.1 Keyboard: ESC key support</li>
          <li>WCAG 4.1.2 Name, Role, Value: Proper ARIA attributes</li>
        </ul>
      </section>
    </main>
  )
}


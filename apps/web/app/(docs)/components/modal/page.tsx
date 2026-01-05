'use client'

import { useState } from 'react'
import { Modal, Button } from '@design-system/core'

export default function ModalPage() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Modal Component</h1>
      <p>Accessible modal dialog with focus trap and keyboard support.</p>
      
      <section style={{ marginTop: '2rem' }}>
        <h2>Example</h2>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Example Modal"
        >
          <p>This is a modal dialog. Press ESC to close or click outside.</p>
          <div style={{ marginTop: '1rem' }}>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </div>
        </Modal>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Accessibility</h2>
        <ul>
          <li>WCAG 2.1.1 Keyboard: ESC key support, focus trap</li>
          <li>WCAG 2.1.2 No Keyboard Trap: Focus returns to trigger</li>
          <li>WCAG 2.4.3 Focus Order: Focus trapped within modal</li>
          <li>WCAG 4.1.2 Name, Role, Value: ARIA modal pattern</li>
        </ul>
      </section>
    </main>
  )
}


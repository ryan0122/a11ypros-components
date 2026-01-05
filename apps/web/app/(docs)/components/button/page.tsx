'use client'

import { Button } from '@design-system/core'

export default function ButtonPage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Button Component</h1>
      <p>Accessible button component with full keyboard support.</p>
      
      <section style={{ marginTop: '2rem' }}>
        <h2>Variants</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Sizes</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>States</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Accessibility</h2>
        <ul>
          <li>WCAG 2.1.1 Keyboard: Full keyboard support (Enter/Space)</li>
          <li>WCAG 2.4.7 Focus Visible: Clear focus indicators</li>
          <li>WCAG 4.1.2 Name, Role, Value: Proper ARIA attributes</li>
        </ul>
      </section>
    </main>
  )
}


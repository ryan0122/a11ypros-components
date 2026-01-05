'use client'

import { Link } from '@design-system/core'

export default function LinkPage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Link Component</h1>
      <p>Accessible link component with external link detection.</p>
      
      <section style={{ marginTop: '2rem' }}>
        <h2>Examples</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link href="/components">Internal Link</Link>
          <Link href="https://example.com" external>External Link</Link>
          <Link href="#main-content" skip>Skip Link</Link>
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Accessibility</h2>
        <ul>
          <li>WCAG 2.4.4 Link Purpose: Clear link text or aria-label</li>
          <li>WCAG 2.4.7 Focus Visible: Clear focus indicators</li>
          <li>WCAG 4.1.2 Name, Role, Value: Proper semantic HTML</li>
        </ul>
      </section>
    </main>
  )
}


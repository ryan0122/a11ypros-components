'use client'

import { Tabs } from '@a11ypros/a11y-ui-components'

export default function TabsPage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Tabs Component</h1>
      <p>Accessible tabs component with arrow key navigation.</p>
      
      <section style={{ marginTop: '2rem' }}>
        <h2>Example</h2>
        <Tabs
          aria-label="Settings tabs"
          items={[
            {
              id: 'general',
              label: 'General',
              content: (
                <div>
                  <h3>General Settings</h3>
                  <p>Configure general application settings here.</p>
                </div>
              ),
            },
            {
              id: 'account',
              label: 'Account',
              content: (
                <div>
                  <h3>Account Settings</h3>
                  <p>Manage your account preferences.</p>
                </div>
              ),
            },
            {
              id: 'privacy',
              label: 'Privacy',
              content: (
                <div>
                  <h3>Privacy Settings</h3>
                  <p>Control your privacy and data settings.</p>
                </div>
              ),
            },
          ]}
        />
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Accessibility</h2>
        <ul>
          <li>WCAG 2.1.1 Keyboard: Arrow key navigation, Home/End support</li>
          <li>WCAG 4.1.2 Name, Role, Value: ARIA tabs pattern</li>
          <li>WCAG 2.4.3 Focus Order: Proper focus management</li>
        </ul>
      </section>
    </main>
  )
}


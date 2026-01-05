'use client'

import { useState } from 'react'
import { Input, Textarea, Select, Checkbox, Radio, Fieldset, Label } from '@design-system/core'

export default function FormPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [country, setCountry] = useState('')
  const [agree, setAgree] = useState(false)
  const [size, setSize] = useState('')

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Form Components</h1>
      <p>Accessible form components with proper labels and ARIA attributes.</p>
      
      <section style={{ marginTop: '2rem' }}>
        <h2>Input</h2>
        <Input
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Textarea</h2>
        <Textarea
          label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={500}
          showCount
        />
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Select</h2>
        <Select
          label="Country"
          options={[
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada' },
            { value: 'uk', label: 'United Kingdom' },
          ]}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Checkbox</h2>
        <Checkbox
          id="agree"
          label="I agree to the terms and conditions"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Radio</h2>
        <Radio
          name="size"
          label="Size"
          options={[
            { value: 's', label: 'Small' },
            { value: 'm', label: 'Medium' },
            { value: 'l', label: 'Large' },
          ]}
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Accessibility</h2>
        <ul>
          <li>WCAG 1.3.1 Info and Relationships: Proper label-input association</li>
          <li>WCAG 2.5.3 Label in Name: Label text matches accessible name</li>
          <li>WCAG 4.1.2 Name, Role, Value: Proper ARIA attributes</li>
          <li>WCAG 4.1.3 Status Messages: Error messages announced</li>
        </ul>
      </section>
    </main>
  )
}


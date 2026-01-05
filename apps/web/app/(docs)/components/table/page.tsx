'use client'

import { useState } from 'react'
import { DataTable } from '@design-system/core'

const sampleData = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
]

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
]

export default function TablePage() {
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [sortConfig, setSortConfig] = useState<{ column: string; direction: 'asc' | 'desc' } | undefined>()

  return (
    <main style={{ padding: '2rem' }}>
      <h1>DataTable Component</h1>
      <p>Accessible data table with keyboard navigation and sorting.</p>
      
      <section style={{ marginTop: '2rem' }}>
        <h2>Example</h2>
        <DataTable
          data={sampleData}
          columns={columns}
          getRowId={(row) => row.id}
          selectable
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          sortConfig={sortConfig}
          onSortChange={(column, direction) => setSortConfig({ column, direction })}
          caption="User list"
        />
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Accessibility</h2>
        <ul>
          <li>WCAG 1.3.1 Info and Relationships: Semantic table structure</li>
          <li>WCAG 2.1.1 Keyboard: Arrow keys, Home/End navigation</li>
          <li>WCAG 4.1.2 Name, Role, Value: Proper ARIA attributes</li>
          <li>WCAG 4.1.3 Status Messages: Sort announcements</li>
        </ul>
      </section>
    </main>
  )
}


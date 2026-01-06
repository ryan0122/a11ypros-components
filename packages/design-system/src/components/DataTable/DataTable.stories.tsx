import type { Meta, StoryObj } from '@storybook/react'
import { useState, useMemo } from 'react'
import { DataTable } from './DataTable'

/**
 * # DataTable Component
 * 
 * An accessible data table component with keyboard navigation, sorting, and selection
 * capabilities. Uses semantic HTML table structure with enhanced accessibility features.
 * 
 * ## Usage
 * 
 * ```tsx
 * import { DataTable } from '@design-system/core'
 * 
 * const data = [
 *   { id: '1', name: 'John Doe', email: 'john@example.com' },
 *   { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
 * ]
 * 
 * const columns = [
 *   { key: 'name', header: 'Name', sortable: true },
 *   { key: 'email', header: 'Email', sortable: true },
 * ]
 * 
 * function MyComponent() {
 *   return (
 *     <DataTable
 *       data={data}
 *       columns={columns}
 *       getRowId={(row) => row.id}
 *       caption="User list"
 *     />
 *   )
 * }
 * ```
 * 
 * ## Features
 * 
 * - **Keyboard navigation**: Arrow keys to navigate rows, Home/End for first/last
 * - **Sorting**: Click column headers to sort (optional)
 * - **Selection**: Select rows with Space key or checkbox (optional)
 * - **Semantic HTML**: Uses proper `<table>`, `<thead>`, `<tbody>` structure
 * - **ARIA support**: Proper ARIA attributes for sortable columns and selected rows
 * 
 * ## Accessibility
 * 
 * ### WCAG 2.1/2.2 Compliance
 * 
 * - **1.3.1 Info and Relationships**: Semantic table structure with proper headers
 * - **2.1.1 Keyboard**: Full keyboard navigation with arrow keys, Home, End, Space
 * - **4.1.2 Name, Role, Value**: Proper ARIA attributes for table, rows, and cells
 * - **4.1.3 Status Messages**: Sort state and selection state announced to screen readers
 * 
 * ### Keyboard Interactions
 * 
 * | Key | Action |
 * |-----|--------|
 * | **Arrow Up** | Move to previous row |
 * | **Arrow Down** | Move to next row |
 * | **Home** | Move to first row |
 * | **End** | Move to last row |
 * | **Space** | Select/deselect row (if selectable) |
 * | **Tab** | Move focus to sortable column headers or other controls |
 * | **Enter** | Activate sort on column header |
 * 
 * ### Screen Reader Support
 * 
 * - Table caption is announced
 * - Column headers are associated with cells
 * - Sort state is announced (e.g., "Name column, sorted ascending")
 * - Row selection state is announced (e.g., "Row 2, selected")
 * - Cell content is read with column header context
 * 
 * ### Focus Management
 * 
 * - Focus moves between rows using arrow keys
 * - Focus moves to sortable column headers with Tab
 * - Selected rows maintain focus state
 * - Focus indicators visible on all interactive elements
 * 
 * ## Best Practices
 * 
 * 1. **Always provide a caption**: Required for screen readers to understand table purpose
 * 2. **Use proper column headers**: Headers should clearly describe column content
 * 3. **Keep tables focused**: Don't nest tables or use tables for layout
 * 4. **Limit row count**: Very large tables should use pagination
 * 5. **Make sortable columns clear**: Use visual indicators for sortable columns
 * 
 * ## Common Pitfalls
 * 
 * - Missing caption (screen readers can't understand table purpose)
 * - Using tables for layout (use CSS Grid or Flexbox instead)
 * - Missing column headers (breaks screen reader navigation)
 * - Too many columns (becomes hard to navigate)
 * - Not announcing sort/selection state (users don't know current state)
 * 
 * @component
 * @example
 * ```tsx
 * <DataTable
 *   data={users}
 *   columns={columns}
 *   getRowId={(row) => row.id}
 *   caption="User directory"
 *   sortable
 * />
 * ```
 */
const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DataTable>

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

// Helper function to sort data
function sortData<T extends Record<string, any>>(
  data: T[],
  sortConfig: { column: string; direction: 'asc' | 'desc' } | undefined
): T[] {
  if (!sortConfig) return data

  return [...data].sort((a, b) => {
    const aValue = a[sortConfig.column]
    const bValue = b[sortConfig.column]

    if (aValue === bValue) return 0

    const comparison = aValue < bValue ? -1 : 1
    return sortConfig.direction === 'asc' ? comparison : -comparison
  })
}

/**
 * Basic data table without sorting. Simple table display with keyboard navigation.
 */
export const Default: Story = {
  args: {
    data: sampleData,
    columns: [
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
      { key: 'role', header: 'Role' },
    ],
    getRowId: (row) => row.id,
    caption: 'User list',
  },
}

/**
 * Selectable table allows users to select rows using Space key or checkboxes.
 * Selection state is announced to screen readers and can be used for bulk actions.
 */
export const Selectable: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<string[]>([])
    return (
      <DataTable
        data={sampleData}
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'email', header: 'Email' },
          { key: 'role', header: 'Role' },
        ]}
        getRowId={(row) => row.id}
        selectable
        selectedRows={selectedRows}
        onSelectionChange={setSelectedRows}
        caption="Selectable user list"
      />
    )
  },
}

/**
 * Sortable table with controlled sorting. Sort configuration is managed externally,
 * allowing for server-side sorting or custom sort logic.
 */
export const Sortable: Story = {
  render: () => {
    const [sortConfig, setSortConfig] = useState<{ column: string; direction: 'asc' | 'desc' } | undefined>()
    const sortedData = useMemo(() => sortData(sampleData, sortConfig), [sortConfig])

    return (
      <DataTable
        data={sortedData}
        columns={columns}
        getRowId={(row) => row.id}
        sortConfig={sortConfig}
        onSortChange={(column, direction) => setSortConfig({ column, direction })}
        caption="Sortable user list"
      />
    )
  },
}


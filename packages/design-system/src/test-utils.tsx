import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import '@testing-library/jest-dom'

// Extend expect with jest-axe matchers
expect.extend(toHaveNoViolations)

// Custom render function that wraps components with necessary providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  theme?: 'light' | 'dark'
}

function customRender(
  ui: ReactElement,
  options?: CustomRenderOptions
) {
  const { theme = 'light', ...renderOptions } = options || {}

  // Set data-theme attribute for testing
  if (theme) {
    document.documentElement.setAttribute('data-theme', theme)
  }

  return render(ui, renderOptions)
}

// Helper function to run axe accessibility tests
async function runAxeTest(container: HTMLElement) {
  const results = await axe(container)
  expect(results).toHaveNoViolations()
  return results
}

// Mock matchMedia for theme and reduced motion tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
  }),
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return []
  }
  unobserve() {}
} as any

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any

// Export everything from @testing-library/react
export * from '@testing-library/react'
export { customRender as render, runAxeTest }

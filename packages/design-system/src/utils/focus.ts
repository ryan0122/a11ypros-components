/**
 * Focus management utilities
 * Helpers for programmatic focus control
 */

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(
  container: HTMLElement
): HTMLElement[] {
  const focusableSelectors = [
    'a[href]:not([tabindex="-1"])',
    'button:not([disabled]):not([tabindex="-1"])',
    'textarea:not([disabled]):not([tabindex="-1"])',
    'input:not([disabled]):not([tabindex="-1"])',
    'select:not([disabled]):not([tabindex="-1"])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ')

  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors))
}

/**
 * Get the first focusable element in a container
 */
export function getFirstFocusable(container: HTMLElement): HTMLElement | null {
  const focusable = getFocusableElements(container)
  return focusable[0] || null
}

/**
 * Get the last focusable element in a container
 */
export function getLastFocusable(container: HTMLElement): HTMLElement | null {
  const focusable = getFocusableElements(container)
  return focusable[focusable.length - 1] || null
}

/**
 * Check if an element is focusable
 */
export function isFocusable(element: HTMLElement): boolean {
  if (element.tabIndex < 0) return false
  if (element.hasAttribute('disabled')) return false
  if (element.hasAttribute('hidden')) return false
  if (element.style.display === 'none') return false
  if (element.style.visibility === 'hidden') return false
  
  return true
}

/**
 * Save the currently focused element
 */
let savedFocusElement: HTMLElement | null = null

export function saveFocus(): void {
  if (document.activeElement instanceof HTMLElement) {
    savedFocusElement = document.activeElement
  }
}

/**
 * Restore focus to the previously saved element
 */
export function restoreFocus(): void {
  if (savedFocusElement) {
    savedFocusElement.focus()
    savedFocusElement = null
  }
}

/**
 * Focus an element safely (with error handling)
 */
export function safeFocus(element: HTMLElement | null): void {
  if (element && typeof element.focus === 'function') {
    try {
      element.focus()
    } catch (error) {
      // Silently fail if focus fails
      console.warn('Failed to focus element:', error)
    }
  }
}


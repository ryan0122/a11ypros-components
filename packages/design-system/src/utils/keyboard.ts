/**
 * Keyboard event utilities
 * Helpers for handling keyboard interactions
 */

export type KeyboardHandler = (event: React.KeyboardEvent) => void

/**
 * Check if a key is an activation key (Enter or Space)
 */
export function isActivationKey(key: string): boolean {
  return key === 'Enter' || key === ' '
}

/**
 * Check if a key is an arrow key
 */
export function isArrowKey(key: string): boolean {
  return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)
}

/**
 * Check if a key is a navigation key (Home, End, PageUp, PageDown)
 */
export function isNavigationKey(key: string): boolean {
  return ['Home', 'End', 'PageUp', 'PageDown'].includes(key)
}

/**
 * Check if a key is an escape key
 */
export function isEscapeKey(key: string): boolean {
  return key === 'Escape'
}

/**
 * Check if modifier keys are pressed
 */
export function hasModifierKey(event: React.KeyboardEvent): boolean {
  return event.ctrlKey || event.metaKey || event.altKey || event.shiftKey
}

/**
 * Create a keyboard handler that only fires on specific keys
 */
export function createKeyHandler(
  keys: string[],
  handler: KeyboardHandler
): KeyboardHandler {
  return (event: React.KeyboardEvent) => {
    if (keys.includes(event.key)) {
      handler(event)
    }
  }
}

/**
 * Create a keyboard handler for activation keys (Enter/Space)
 */
export function createActivationHandler(
  handler: KeyboardHandler
): KeyboardHandler {
  return createKeyHandler(['Enter', ' '], (event) => {
    event.preventDefault()
    handler(event)
  })
}

/**
 * Create a keyboard handler for arrow keys
 */
export function createArrowKeyHandler(
  handler: KeyboardHandler
): KeyboardHandler {
  return createKeyHandler(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'], handler)
}


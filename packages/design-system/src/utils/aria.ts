/**
 * ARIA utility functions
 * Helpers for managing ARIA attributes and roles
 */

/**
 * Generate a unique ID for ARIA attributes
 */
let idCounter = 0
export function generateId(prefix = 'id'): string {
  return `${prefix}-${++idCounter}`
}

/**
 * Get ARIA label from props, preferring aria-label over aria-labelledby
 */
export function getAriaLabel(
  ariaLabel?: string,
  ariaLabelledBy?: string
): { 'aria-label'?: string; 'aria-labelledby'?: string } {
  if (ariaLabel) {
    return { 'aria-label': ariaLabel }
  }
  if (ariaLabelledBy) {
    return { 'aria-labelledby': ariaLabelledBy }
  }
  return {}
}

/**
 * Get ARIA describedby attributes
 */
export function getAriaDescribedBy(
  describedBy?: string
): { 'aria-describedby'?: string } {
  if (describedBy) {
    return { 'aria-describedby': describedBy }
  }
  return {}
}

/**
 * Combine multiple ARIA describedby IDs
 */
export function combineAriaDescribedBy(...ids: (string | undefined)[]): string | undefined {
  const validIds = ids.filter((id): id is string => Boolean(id))
  return validIds.length > 0 ? validIds.join(' ') : undefined
}

/**
 * Get live region attributes
 */
export function getLiveRegionAttributes(
  live: 'polite' | 'assertive' | 'off' = 'polite'
): { 'aria-live': 'polite' | 'assertive' | 'off'; 'aria-atomic'?: boolean } {
  return {
    'aria-live': live,
    'aria-atomic': live !== 'off',
  }
}

/**
 * Get busy state attributes
 */
export function getBusyAttributes(busy: boolean): { 'aria-busy': boolean } {
  return { 'aria-busy': busy }
}

/**
 * Get expanded state attributes
 */
export function getExpandedAttributes(
  expanded: boolean | undefined
): { 'aria-expanded'?: boolean } {
  if (expanded === undefined) return {}
  return { 'aria-expanded': expanded }
}

/**
 * Get pressed state attributes (for toggle buttons)
 */
export function getPressedAttributes(
  pressed: boolean | undefined
): { 'aria-pressed'?: boolean } {
  if (pressed === undefined) return {}
  return { 'aria-pressed': pressed }
}

/**
 * Get selected state attributes
 */
export function getSelectedAttributes(
  selected: boolean | undefined
): { 'aria-selected'?: boolean } {
  if (selected === undefined) return {}
  return { 'aria-selected': selected }
}

/**
 * Get current state attributes (for navigation)
 */
export function getCurrentAttributes(
  current: boolean | 'page' | 'step' | 'location' | 'date' | 'time' | undefined
): { 'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time' } {
  if (current === undefined) return {}
  return { 'aria-current': current }
}


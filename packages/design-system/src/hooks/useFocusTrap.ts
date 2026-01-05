'use client'

import { useEffect, useRef } from 'react'
import { getFirstFocusable, getLastFocusable } from '../utils/focus'

/**
 * Hook to trap focus within a container element
 * Implements WCAG 2.1.2 Keyboard (No Keyboard Trap)
 * 
 * @param enabled - Whether the focus trap is active
 * @param containerRef - Ref to the container element
 */
export function useFocusTrap(
  enabled: boolean,
  containerRef: React.RefObject<HTMLElement>
): void {
  const previousActiveElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!enabled || !containerRef.current) return

    const container = containerRef.current

    // Save the previously focused element
    if (document.activeElement instanceof HTMLElement) {
      previousActiveElement.current = document.activeElement
    }

    // Focus the first focusable element in the container
    const firstFocusable = getFirstFocusable(container)
    if (firstFocusable) {
      firstFocusable.focus()
    } else {
      // If no focusable elements, focus the container itself
      container.focus()
    }

    // Handle Tab key to trap focus
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return

      const focusableElements = [
        getFirstFocusable(container),
        getLastFocusable(container),
      ].filter(Boolean) as HTMLElement[]

      if (focusableElements.length === 0) {
        event.preventDefault()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    }

    container.addEventListener('keydown', handleKeyDown)

    return () => {
      container.removeEventListener('keydown', handleKeyDown)
      
      // Restore focus to the previously focused element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }
  }, [enabled, containerRef])
}


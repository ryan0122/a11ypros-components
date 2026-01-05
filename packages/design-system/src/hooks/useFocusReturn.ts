'use client'

import { useEffect, useRef } from 'react'

/**
 * Hook to return focus to a previously focused element when component unmounts
 * Useful for modals, dropdowns, and other temporary UI elements
 * 
 * @param returnOnUnmount - Whether to return focus on unmount
 * @param returnElement - Optional specific element to return focus to
 */
export function useFocusReturn(
  returnOnUnmount: boolean = true,
  returnElement?: HTMLElement | null
): void {
  const savedElementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!returnOnUnmount) return

    // Save the currently focused element
    if (document.activeElement instanceof HTMLElement) {
      savedElementRef.current = document.activeElement
    }

    return () => {
      // Restore focus on unmount
      const elementToFocus = returnElement || savedElementRef.current
      if (elementToFocus && typeof elementToFocus.focus === 'function') {
        try {
          elementToFocus.focus()
        } catch (error) {
          // Silently fail if focus fails
          console.warn('Failed to return focus:', error)
        }
      }
    }
  }, [returnOnUnmount, returnElement])
}


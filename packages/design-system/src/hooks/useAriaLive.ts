'use client'

import { useEffect, useRef } from 'react'

/**
 * Hook to manage ARIA live regions for screen reader announcements
 * 
 * @param message - Message to announce
 * @param priority - 'polite' (default) or 'assertive'
 * @param clearOnUnmount - Whether to clear the message on unmount
 */
export function useAriaLive(
  message: string | undefined,
  priority: 'polite' | 'assertive' = 'polite',
  clearOnUnmount: boolean = true
): void {
  const liveRegionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Create or get the live region element
    let liveRegion = document.getElementById(`aria-live-${priority}`) as HTMLDivElement

    if (!liveRegion) {
      liveRegion = document.createElement('div')
      liveRegion.id = `aria-live-${priority}`
      liveRegion.setAttribute('role', 'status')
      liveRegion.setAttribute('aria-live', priority)
      liveRegion.setAttribute('aria-atomic', 'true')
      liveRegion.style.position = 'absolute'
      liveRegion.style.left = '-10000px'
      liveRegion.style.width = '1px'
      liveRegion.style.height = '1px'
      liveRegion.style.overflow = 'hidden'
      document.body.appendChild(liveRegion)
    }

    liveRegionRef.current = liveRegion

    // Update the message
    if (message) {
      liveRegion.textContent = message
    }

    return () => {
      if (clearOnUnmount && liveRegionRef.current) {
        liveRegionRef.current.textContent = ''
      }
    }
  }, [message, priority, clearOnUnmount])
}


'use client'

import React, { useEffect, useState } from 'react'
import { useAriaLive } from '../../hooks/useAriaLive'
import { isEscapeKey } from '../../utils/keyboard'
import { Button } from '../Button/Button'
import './Toast.css'

export interface ToastProps {
  /**
   * Unique ID for the toast
   */
  id: string
  
  /**
   * Toast message
   */
  message: string
  
  /**
   * Toast type
   */
  type?: 'info' | 'success' | 'warning' | 'error'
  
  /**
   * Whether toast can be dismissed
   */
  dismissible?: boolean
  
  /**
   * Auto-dismiss duration in milliseconds (0 = no auto-dismiss). For WCAG compliance, this should be 6 seconds.
   */
  duration?: number
  
  /**
   * Callback when toast is dismissed
   */
  onDismiss: (id: string) => void
  
  /**
   * Pause auto-dismiss on hover
   */
  pauseOnHover?: boolean
}

/**
 * Accessible Toast component
 * 
 * WCAG Compliance:
 * - 4.1.3 Status Messages: ARIA live region announcements
 * - 2.1.1 Keyboard: ESC key support, Tab navigation support
 * - 2.4.3 Focus Order: Consistent focus order - toasts always appear in same position
 * - 4.1.2 Name, Role, Value: Proper ARIA attributes
 * 
 * Focus Order:
 * - Toasts are focusable with tabIndex={0} (not positive tabindex)
 * - Toast container is always rendered in the same DOM position (via portal to body)
 * - Toasts appear in consistent order (order added) for predictable tab navigation
 * - Container itself is not focusable, only individual toasts are focusable
 * 
 * @example
 * ```tsx
 * <Toast
 *   id="toast-1"
 *   message="Successfully saved!"
 *   type="success"
 *   onDismiss={handleDismiss}
 * />
 * ```
 */
export const Toast: React.FC<ToastProps> = ({
  id,
  message,
  type = 'info',
  dismissible = true,
  duration = 6000,
  onDismiss,
  pauseOnHover = true,
}) => {
  const [isPaused, setIsPaused] = useState(false)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  // Announce toast via ARIA live region
  useAriaLive(message, type === 'error' ? 'assertive' : 'polite')

  // Auto-dismiss
  useEffect(() => {
    if (duration === 0 || isPaused) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      return
    }

    timeoutRef.current = setTimeout(() => {
      onDismiss(id)
    }, duration)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [duration, id, onDismiss, isPaused])

  // Handle ESC key
  useEffect(() => {
    if (!dismissible) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEscapeKey(event.key)) {
        onDismiss(id)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [dismissible, id, onDismiss])

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true)
    }
  }

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false)
    }
  }

  const handleDismiss = () => {
    onDismiss(id)
  }

  const classes = [
    'toast',
    `toast--${type}`,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={classes}
      role="alert"
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      aria-atomic="true"
      tabIndex={0}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="toast-content">
        <span className="toast-message">{message}</span>
      </div>
      {dismissible && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          aria-label="Dismiss notification"
          className="toast-dismiss"
        >
          ×
        </Button>
      )}
    </div>
  )
}

Toast.displayName = 'Toast'


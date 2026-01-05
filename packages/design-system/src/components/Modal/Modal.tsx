'use client'

import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { useFocusReturn } from '../../hooks/useFocusReturn'
import { isEscapeKey } from '../../utils/keyboard'
import { Button } from '../Button/Button'
import './Modal.css'

export interface ModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean
  
  /**
   * Callback when modal should close
   */
  onClose: () => void
  
  /**
   * Title of the modal (required for accessibility)
   */
  title: string
  
  /**
   * Content of the modal
   */
  children: React.ReactNode
  
  /**
   * Whether to close on backdrop click
   */
  closeOnBackdropClick?: boolean
  
  /**
   * Whether to close on ESC key press
   */
  closeOnEscape?: boolean
  
  /**
   * Size of the modal
   */
  size?: 'sm' | 'md' | 'lg' | 'full'
  
  /**
   * Element to return focus to when modal closes
   */
  returnFocusTo?: HTMLElement | null
}

/**
 * Accessible Modal component
 * 
 * WCAG Compliance:
 * - 2.1.1 Keyboard: ESC key support, focus trap
 * - 2.1.2 No Keyboard Trap: Focus returns to trigger
 * - 2.4.3 Focus Order: Focus trapped within modal
 * - 4.1.2 Name, Role, Value: ARIA modal pattern
 * 
 * @example
 * ```tsx
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirm Action"
 * >
 *   <p>Are you sure?</p>
 * </Modal>
 * ```
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  size = 'md',
  returnFocusTo,
}) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const titleId = React.useId()
  const descriptionId = React.useId()

  // Focus trap
  useFocusTrap(isOpen, modalRef)

  // Return focus on close
  useFocusReturn(isOpen, returnFocusTo)

  // Handle ESC key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEscapeKey(event.key)) {
        event.preventDefault()
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, closeOnEscape, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Handle backdrop click
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && event.target === event.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  const modalContent = (
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        ref={modalRef}
        className={`modal modal--${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <div className="modal-header">
          <h2 id={titleId} className="modal-title">
            {title}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Close modal"
            className="modal-close"
          >
            ×
          </Button>
        </div>
        <div id={descriptionId} className="modal-content">
          {children}
        </div>
      </div>
    </div>
  )

  // Render modal in a portal
  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body)
  }

  return null
}

Modal.displayName = 'Modal'


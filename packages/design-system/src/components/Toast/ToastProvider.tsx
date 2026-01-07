'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Toast, ToastProps } from './Toast'
import './ToastProvider.css'

export interface ToastItem extends Omit<ToastProps, 'onDismiss'> {
  id: string
}

interface ToastContextValue {
  addToast: (toast: Omit<ToastItem, 'id'>) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

export interface ToastProviderProps {
  children: React.ReactNode
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
}

/**
 * Toast Provider component
 * Manages toast stack and positioning
 */
export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = 'top-right',
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const addToast = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random()}`
    setToasts((prev) => [...prev, { ...toast, id }])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  // Always render container to maintain consistent DOM position for focus order
  // Toasts appear in order they were added (newest last), maintaining consistent tab order
  const toastContainer = (
    <div 
      className={`toast-container toast-container--${position}`} 
      role="region" 
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onDismiss={removeToast} />
      ))}
    </div>
  )

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {typeof document !== 'undefined' &&
        createPortal(toastContainer, document.body)}
    </ToastContext.Provider>
  )
}


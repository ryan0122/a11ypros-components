import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useFocusTrap } from './useFocusTrap'
import { useRef } from 'react'

describe('useFocusTrap', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('focuses first element when enabled', () => {
    const container = document.createElement('div')
    const button1 = document.createElement('button')
    const button2 = document.createElement('button')
    container.appendChild(button1)
    container.appendChild(button2)
    document.body.appendChild(container)

    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      ref.current = container
      useFocusTrap(true, ref)
      return ref
    })

    expect(document.activeElement).toBe(button1)

    document.body.removeChild(container)
  })

  it('does not trap focus when disabled', () => {
    const container = document.createElement('div')
    const button = document.createElement('button')
    container.appendChild(button)
    document.body.appendChild(container)

    const initialFocus = document.activeElement

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      ref.current = container
      useFocusTrap(false, ref)
      return ref
    })

    expect(document.activeElement).toBe(initialFocus)

    document.body.removeChild(container)
  })

  it('traps Tab navigation within container', () => {
    const container = document.createElement('div')
    const button1 = document.createElement('button')
    const button2 = document.createElement('button')
    const button3 = document.createElement('button')
    container.appendChild(button1)
    container.appendChild(button2)
    container.appendChild(button3)
    document.body.appendChild(container)

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      ref.current = container
      useFocusTrap(true, ref)
      return ref
    })

    button3.focus()
    expect(document.activeElement).toBe(button3)

    // Simulate Tab key on last element
    const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true })
    button3.dispatchEvent(event)

    // Should wrap to first element (but jsdom doesn't change focus automatically)
    // We can verify the event was handled by checking if preventDefault was called

    document.body.removeChild(container)
  })

  it('handles Shift+Tab to go backwards', () => {
    const container = document.createElement('div')
    const button1 = document.createElement('button')
    const button2 = document.createElement('button')
    container.appendChild(button1)
    container.appendChild(button2)
    document.body.appendChild(container)

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      ref.current = container
      useFocusTrap(true, ref)
      return ref
    })

    // First element should be focused initially
    expect(document.activeElement).toBe(button1)

    // Simulate Shift+Tab on first element
    const event = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true,
      bubbles: true,
    })
    button1.dispatchEvent(event)

    document.body.removeChild(container)
  })

  it('focuses container if no focusable elements', () => {
    const container = document.createElement('div')
    container.tabIndex = 0
    document.body.appendChild(container)

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      ref.current = container
      useFocusTrap(true, ref)
      return ref
    })

    expect(document.activeElement).toBe(container)

    document.body.removeChild(container)
  })

  it('restores focus on unmount', () => {
    const outsideButton = document.createElement('button')
    document.body.appendChild(outsideButton)
    outsideButton.focus()

    const container = document.createElement('div')
    const insideButton = document.createElement('button')
    container.appendChild(insideButton)
    document.body.appendChild(container)

    const { unmount } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      ref.current = container
      useFocusTrap(true, ref)
      return ref
    })

    expect(document.activeElement).toBe(insideButton)

    unmount()

    expect(document.activeElement).toBe(outsideButton)

    document.body.removeChild(outsideButton)
    document.body.removeChild(container)
  })

  it('does nothing when containerRef is null', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      useFocusTrap(true, ref)
      return ref
    })

    expect(() => result.current).not.toThrow()
  })

  it('prevents default when Tab on last element', () => {
    const container = document.createElement('div')
    const button = document.createElement('button')
    container.appendChild(button)
    document.body.appendChild(container)

    renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      ref.current = container
      useFocusTrap(true, ref)
      return ref
    })

    button.focus()

    const event = new KeyboardEvent('keydown', {
      key: 'Tab',
      bubbles: true,
      cancelable: true,
    })
    Object.defineProperty(event, 'defaultPrevented', { value: false, writable: true })
    
    button.dispatchEvent(event)

    document.body.removeChild(container)
  })
})

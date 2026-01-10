import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useFocusReturn } from './useFocusReturn'

describe('useFocusReturn', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('saves currently focused element on mount', () => {
    const button = document.createElement('button')
    document.body.appendChild(button)
    button.focus()

    expect(document.activeElement).toBe(button)

    renderHook(() => useFocusReturn(true))

    document.body.removeChild(button)
  })

  it('returns focus to previously focused element on unmount', () => {
    const button1 = document.createElement('button')
    const button2 = document.createElement('button')
    document.body.appendChild(button1)
    document.body.appendChild(button2)

    button1.focus()
    expect(document.activeElement).toBe(button1)

    const { unmount } = renderHook(() => useFocusReturn(true))

    button2.focus()
    expect(document.activeElement).toBe(button2)

    unmount()
    expect(document.activeElement).toBe(button1)

    document.body.removeChild(button1)
    document.body.removeChild(button2)
  })

  it('does not return focus when returnOnUnmount is false', () => {
    const button1 = document.createElement('button')
    const button2 = document.createElement('button')
    document.body.appendChild(button1)
    document.body.appendChild(button2)

    button1.focus()
    const { unmount } = renderHook(() => useFocusReturn(false))

    button2.focus()
    expect(document.activeElement).toBe(button2)

    unmount()
    expect(document.activeElement).toBe(button2)

    document.body.removeChild(button1)
    document.body.removeChild(button2)
  })

  it('returns focus to specified returnElement', () => {
    const button1 = document.createElement('button')
    const button2 = document.createElement('button')
    const button3 = document.createElement('button')
    document.body.appendChild(button1)
    document.body.appendChild(button2)
    document.body.appendChild(button3)

    button1.focus()
    const { unmount } = renderHook(() => useFocusReturn(true, button3))

    button2.focus()
    expect(document.activeElement).toBe(button2)

    unmount()
    expect(document.activeElement).toBe(button3)

    document.body.removeChild(button1)
    document.body.removeChild(button2)
    document.body.removeChild(button3)
  })

  it('handles null returnElement gracefully', () => {
    const button = document.createElement('button')
    document.body.appendChild(button)
    button.focus()

    const { unmount } = renderHook(() => useFocusReturn(true, null))

    expect(() => unmount()).not.toThrow()

    document.body.removeChild(button)
  })

  it('handles focus error gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const button = document.createElement('button')
    document.body.appendChild(button)
    button.focus()

    const mockElement = { focus: vi.fn(() => { throw new Error('Focus failed') }) } as unknown as HTMLElement

    const { unmount } = renderHook(() => useFocusReturn(true, mockElement))

    expect(() => unmount()).not.toThrow()
    expect(consoleSpy).toHaveBeenCalledWith('Failed to return focus:', expect.any(Error))

    consoleSpy.mockRestore()
    document.body.removeChild(button)
  })

  it('does nothing if saved element is not focusable', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)

    const { unmount } = renderHook(() => useFocusReturn(true))

    expect(() => unmount()).not.toThrow()

    document.body.removeChild(div)
  })
})

import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useAriaLive } from './useAriaLive'

describe('useAriaLive', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  afterEach(() => {
    // Clean up live regions
    document.querySelectorAll('[aria-live]').forEach((el) => el.remove())
  })

  it('creates a polite live region', () => {
    renderHook(() => useAriaLive('Test message', 'polite'))

    const liveRegion = document.getElementById('aria-live-polite')
    expect(liveRegion).toBeTruthy()
    expect(liveRegion?.getAttribute('aria-live')).toBe('polite')
  })

  it('creates an assertive live region', () => {
    renderHook(() => useAriaLive('Urgent message', 'assertive'))

    const liveRegion = document.getElementById('aria-live-assertive')
    expect(liveRegion).toBeTruthy()
    expect(liveRegion?.getAttribute('aria-live')).toBe('assertive')
  })

  it('sets the message in the live region', () => {
    renderHook(() => useAriaLive('Hello world', 'polite'))

    const liveRegion = document.getElementById('aria-live-polite')
    expect(liveRegion?.textContent).toBe('Hello world')
  })

  it('updates message when it changes', () => {
    const { rerender } = renderHook(
      ({ message }) => useAriaLive(message, 'polite'),
      { initialProps: { message: 'First message' } }
    )

    const liveRegion = document.getElementById('aria-live-polite')
    expect(liveRegion?.textContent).toBe('First message')

    rerender({ message: 'Second message' })
    expect(liveRegion?.textContent).toBe('Second message')
  })

  it('reuses existing live region', () => {
    renderHook(() => useAriaLive('Message 1', 'polite'))
    renderHook(() => useAriaLive('Message 2', 'polite'))

    const liveRegions = document.querySelectorAll('#aria-live-polite')
    expect(liveRegions.length).toBe(1)
  })

  it('clears message on unmount by default', () => {
    const { unmount } = renderHook(() => useAriaLive('Test message', 'polite'))

    const liveRegion = document.getElementById('aria-live-polite')
    expect(liveRegion?.textContent).toBe('Test message')

    unmount()
    expect(liveRegion?.textContent).toBe('')
  })

  it('does not clear message on unmount when clearOnUnmount is false', () => {
    const { unmount } = renderHook(() =>
      useAriaLive('Test message', 'polite', false)
    )

    const liveRegion = document.getElementById('aria-live-polite')
    expect(liveRegion?.textContent).toBe('Test message')

    unmount()
    expect(liveRegion?.textContent).toBe('Test message')
  })

  it('has visually hidden styles', () => {
    renderHook(() => useAriaLive('Test', 'polite'))

    const liveRegion = document.getElementById('aria-live-polite') as HTMLDivElement
    expect(liveRegion.style.position).toBe('absolute')
    expect(liveRegion.style.left).toBe('-10000px')
    expect(liveRegion.style.overflow).toBe('hidden')
  })

  it('sets role=status', () => {
    renderHook(() => useAriaLive('Test', 'polite'))

    const liveRegion = document.getElementById('aria-live-polite')
    expect(liveRegion?.getAttribute('role')).toBe('status')
  })

  it('sets aria-atomic=true', () => {
    renderHook(() => useAriaLive('Test', 'polite'))

    const liveRegion = document.getElementById('aria-live-polite')
    expect(liveRegion?.getAttribute('aria-atomic')).toBe('true')
  })

  it('handles undefined message', () => {
    renderHook(() => useAriaLive(undefined, 'polite'))

    const liveRegion = document.getElementById('aria-live-polite')
    expect(liveRegion?.textContent).toBe('')
  })
})

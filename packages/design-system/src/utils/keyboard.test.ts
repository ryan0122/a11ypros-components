import { describe, it, expect, vi } from 'vitest'
import {
  isActivationKey,
  isArrowKey,
  isNavigationKey,
  isEscapeKey,
  hasModifierKey,
  createKeyHandler,
  createActivationHandler,
  createArrowKeyHandler,
} from './keyboard'

describe('keyboard utils', () => {
  describe('isActivationKey', () => {
    it('returns true for Enter key', () => {
      expect(isActivationKey('Enter')).toBe(true)
    })

    it('returns true for Space key', () => {
      expect(isActivationKey(' ')).toBe(true)
    })

    it('returns false for other keys', () => {
      expect(isActivationKey('a')).toBe(false)
      expect(isActivationKey('Escape')).toBe(false)
      expect(isActivationKey('Tab')).toBe(false)
    })
  })

  describe('isArrowKey', () => {
    it('returns true for arrow keys', () => {
      expect(isArrowKey('ArrowUp')).toBe(true)
      expect(isArrowKey('ArrowDown')).toBe(true)
      expect(isArrowKey('ArrowLeft')).toBe(true)
      expect(isArrowKey('ArrowRight')).toBe(true)
    })

    it('returns false for other keys', () => {
      expect(isArrowKey('Enter')).toBe(false)
      expect(isArrowKey('Tab')).toBe(false)
      expect(isArrowKey('a')).toBe(false)
    })
  })

  describe('isNavigationKey', () => {
    it('returns true for navigation keys', () => {
      expect(isNavigationKey('Home')).toBe(true)
      expect(isNavigationKey('End')).toBe(true)
      expect(isNavigationKey('PageUp')).toBe(true)
      expect(isNavigationKey('PageDown')).toBe(true)
    })

    it('returns false for other keys', () => {
      expect(isNavigationKey('Enter')).toBe(false)
      expect(isNavigationKey('ArrowUp')).toBe(false)
      expect(isNavigationKey('Tab')).toBe(false)
    })
  })

  describe('isEscapeKey', () => {
    it('returns true for Escape key', () => {
      expect(isEscapeKey('Escape')).toBe(true)
    })

    it('returns false for other keys', () => {
      expect(isEscapeKey('Enter')).toBe(false)
      expect(isEscapeKey('Tab')).toBe(false)
      expect(isEscapeKey('a')).toBe(false)
    })
  })

  describe('hasModifierKey', () => {
    it('returns true when ctrl is pressed', () => {
      const event = { ctrlKey: true, metaKey: false, altKey: false, shiftKey: false } as any
      expect(hasModifierKey(event)).toBe(true)
    })

    it('returns true when meta is pressed', () => {
      const event = { ctrlKey: false, metaKey: true, altKey: false, shiftKey: false } as any
      expect(hasModifierKey(event)).toBe(true)
    })

    it('returns true when alt is pressed', () => {
      const event = { ctrlKey: false, metaKey: false, altKey: true, shiftKey: false } as any
      expect(hasModifierKey(event)).toBe(true)
    })

    it('returns true when shift is pressed', () => {
      const event = { ctrlKey: false, metaKey: false, altKey: false, shiftKey: true } as any
      expect(hasModifierKey(event)).toBe(true)
    })

    it('returns false when no modifier keys are pressed', () => {
      const event = { ctrlKey: false, metaKey: false, altKey: false, shiftKey: false } as any
      expect(hasModifierKey(event)).toBe(false)
    })
  })

  describe('createKeyHandler', () => {
    it('calls handler only for specified keys', () => {
      const handler = vi.fn()
      const keyHandler = createKeyHandler(['Enter', 'Space'], handler)

      keyHandler({ key: 'Enter' } as any)
      expect(handler).toHaveBeenCalledTimes(1)

      keyHandler({ key: 'a' } as any)
      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('passes event to handler', () => {
      const handler = vi.fn()
      const keyHandler = createKeyHandler(['Enter'], handler)
      const event = { key: 'Enter' } as any

      keyHandler(event)
      expect(handler).toHaveBeenCalledWith(event)
    })
  })

  describe('createActivationHandler', () => {
    it('calls handler for Enter key', () => {
      const handler = vi.fn()
      const activationHandler = createActivationHandler(handler)
      const event = { key: 'Enter', preventDefault: vi.fn() } as any

      activationHandler(event)
      expect(handler).toHaveBeenCalledTimes(1)
      expect(event.preventDefault).toHaveBeenCalled()
    })

    it('calls handler for Space key', () => {
      const handler = vi.fn()
      const activationHandler = createActivationHandler(handler)
      const event = { key: ' ', preventDefault: vi.fn() } as any

      activationHandler(event)
      expect(handler).toHaveBeenCalledTimes(1)
      expect(event.preventDefault).toHaveBeenCalled()
    })

    it('does not call handler for other keys', () => {
      const handler = vi.fn()
      const activationHandler = createActivationHandler(handler)
      const event = { key: 'a', preventDefault: vi.fn() } as any

      activationHandler(event)
      expect(handler).not.toHaveBeenCalled()
    })

    it('prevents default behavior', () => {
      const handler = vi.fn()
      const activationHandler = createActivationHandler(handler)
      const event = { key: 'Enter', preventDefault: vi.fn() } as any

      activationHandler(event)
      expect(event.preventDefault).toHaveBeenCalled()
    })
  })

  describe('createArrowKeyHandler', () => {
    it('calls handler for all arrow keys', () => {
      const handler = vi.fn()
      const arrowHandler = createArrowKeyHandler(handler)

      arrowHandler({ key: 'ArrowUp' } as any)
      arrowHandler({ key: 'ArrowDown' } as any)
      arrowHandler({ key: 'ArrowLeft' } as any)
      arrowHandler({ key: 'ArrowRight' } as any)

      expect(handler).toHaveBeenCalledTimes(4)
    })

    it('does not call handler for other keys', () => {
      const handler = vi.fn()
      const arrowHandler = createArrowKeyHandler(handler)

      arrowHandler({ key: 'Enter' } as any)
      arrowHandler({ key: 'Tab' } as any)

      expect(handler).not.toHaveBeenCalled()
    })
  })
})

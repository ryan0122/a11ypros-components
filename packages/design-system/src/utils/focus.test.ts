import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  getFocusableElements,
  getFirstFocusable,
  getLastFocusable,
  isFocusable,
  saveFocus,
  restoreFocus,
  safeFocus,
} from './focus'

describe('focus utils', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  describe('getFocusableElements', () => {
    it('finds all focusable elements', () => {
      const container = document.createElement('div')
      container.innerHTML = `
        <button>Button</button>
        <a href="#">Link</a>
        <input type="text" />
        <textarea></textarea>
        <select><option>Option</option></select>
        <div tabindex="0">Focusable div</div>
      `
      document.body.appendChild(container)

      const focusable = getFocusableElements(container)
      expect(focusable).toHaveLength(6)

      document.body.removeChild(container)
    })

    it('excludes disabled elements', () => {
      const container = document.createElement('div')
      container.innerHTML = `
        <button>Enabled</button>
        <button disabled>Disabled</button>
        <input type="text" />
        <input type="text" disabled />
      `
      document.body.appendChild(container)

      const focusable = getFocusableElements(container)
      expect(focusable).toHaveLength(2)

      document.body.removeChild(container)
    })

    it('excludes elements with negative tabindex', () => {
      const container = document.createElement('div')
      container.innerHTML = `
        <button tabindex="0">Button 1</button>
        <button tabindex="-1">Button 2</button>
        <button>Button 3</button>
      `
      document.body.appendChild(container)

      const focusable = getFocusableElements(container)
      expect(focusable).toHaveLength(2) // Should not include tabindex="-1"

      container.remove()
    })
  })

  describe('getFirstFocusable', () => {
    it('returns first focusable element', () => {
      const container = document.createElement('div')
      container.innerHTML = `
        <button>First</button>
        <button>Second</button>
      `
      document.body.appendChild(container)

      const first = getFirstFocusable(container)
      expect(first).toBe(container.querySelector('button'))

      container.remove()
    })

    it('returns null when no focusable elements', () => {
      const container = document.createElement('div')
      const result = getFirstFocusable(container)
      expect(result).toBeNull()
    })
  })

  describe('getLastFocusable', () => {
    it('returns last focusable element', () => {
      const container = document.createElement('div')
      const button1 = document.createElement('button')
      const button2 = document.createElement('button')
      container.appendChild(button1)
      container.appendChild(button2)

      const result = getLastFocusable(container)
      expect(result).toBe(button2)
    })

    it('returns null when no focusable elements exist', () => {
      const container = document.createElement('div')
      const result = getLastFocusable(container)
      expect(result).toBeNull()
    })
  })

  describe('isFocusable', () => {
    it('returns true for focusable element', () => {
      const button = document.createElement('button')
      expect(isFocusable(button)).toBe(true)
    })

    it('returns false for disabled element', () => {
      const button = document.createElement('button')
      button.setAttribute('disabled', 'true')
      expect(isFocusable(button)).toBe(false)
    })

    it('returns false for hidden element', () => {
      const div = document.createElement('div')
      div.setAttribute('hidden', '')
      expect(isFocusable(div)).toBe(false)
    })

    it('returns false for element with display none', () => {
      const div = document.createElement('div')
      div.style.display = 'none'
      expect(isFocusable(div)).toBe(false)
    })

    it('returns false for element with visibility hidden', () => {
      const div = document.createElement('div')
      div.style.visibility = 'hidden'
      expect(isFocusable(div)).toBe(false)
    })

    it('returns false for element with negative tabindex', () => {
      const div = document.createElement('div')
      div.tabIndex = -1
      expect(isFocusable(div)).toBe(false)
    })
  })

  describe('saveFocus and restoreFocus', () => {
    it('saves and restores focus', () => {
      const element = document.createElement('button')
      document.body.appendChild(element)
      element.focus()

      saveFocus()
      expect(document.activeElement).toBe(element)

      const otherElement = document.createElement('button')
      document.body.appendChild(otherElement)
      otherElement.focus()

      restoreFocus()
      expect(document.activeElement).toBe(element)

      document.body.removeChild(element)
      document.body.removeChild(otherElement)
    })

    it('handles null element', () => {
      expect(() => safeFocus(null)).not.toThrow()
    })

    it('handles elements without focus method', () => {
      const element = {} as HTMLElement
      expect(() => safeFocus(element)).not.toThrow()
    })
  })
})

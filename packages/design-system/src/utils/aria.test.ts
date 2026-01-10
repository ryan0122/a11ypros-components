import { describe, it, expect, beforeEach } from 'vitest'
import {
  generateId,
  getAriaLabel,
  getAriaDescribedBy,
  combineAriaDescribedBy,
  getLiveRegionAttributes,
  getBusyAttributes,
  getExpandedAttributes,
  getPressedAttributes,
  getSelectedAttributes,
  getCurrentAttributes,
} from './aria'

describe('aria utils', () => {
  describe('generateId', () => {
    it('generates unique IDs', () => {
      const id1 = generateId()
      const id2 = generateId()
      expect(id1).not.toBe(id2)
    })

    it('uses provided prefix', () => {
      const id = generateId('test')
      expect(id).toMatch(/^test-\d+$/)
    })

    it('uses default prefix when not provided', () => {
      const id = generateId()
      expect(id).toMatch(/^id-\d+$/)
    })
  })

  describe('getAriaLabel', () => {
    it('returns aria-label when provided', () => {
      const result = getAriaLabel('Test label')
      expect(result).toEqual({ 'aria-label': 'Test label' })
    })

    it('returns aria-labelledby when provided and no aria-label', () => {
      const result = getAriaLabel(undefined, 'label-id')
      expect(result).toEqual({ 'aria-labelledby': 'label-id' })
    })

    it('prefers aria-label over aria-labelledby', () => {
      const result = getAriaLabel('Test label', 'label-id')
      expect(result).toEqual({ 'aria-label': 'Test label' })
    })

    it('returns empty object when neither provided', () => {
      const result = getAriaLabel()
      expect(result).toEqual({})
    })
  })

  describe('getAriaDescribedBy', () => {
    it('returns aria-describedby when provided', () => {
      const result = getAriaDescribedBy('desc-id')
      expect(result).toEqual({ 'aria-describedby': 'desc-id' })
    })

    it('returns empty object when not provided', () => {
      const result = getAriaDescribedBy()
      expect(result).toEqual({})
    })
  })

  describe('combineAriaDescribedBy', () => {
    it('combines multiple IDs with spaces', () => {
      const result = combineAriaDescribedBy('id1', 'id2', 'id3')
      expect(result).toBe('id1 id2 id3')
    })

    it('filters out undefined values', () => {
      const result = combineAriaDescribedBy('id1', undefined, 'id2')
      expect(result).toBe('id1 id2')
    })

    it('returns undefined when all values are undefined', () => {
      const result = combineAriaDescribedBy(undefined, undefined)
      expect(result).toBeUndefined()
    })

    it('handles empty array', () => {
      const result = combineAriaDescribedBy()
      expect(result).toBeUndefined()
    })
  })

  describe('getLiveRegionAttributes', () => {
    it('returns polite live region by default', () => {
      const result = getLiveRegionAttributes()
      expect(result).toEqual({
        'aria-live': 'polite',
        'aria-atomic': true,
      })
    })

    it('returns assertive live region when specified', () => {
      const result = getLiveRegionAttributes('assertive')
      expect(result).toEqual({
        'aria-live': 'assertive',
        'aria-atomic': true,
      })
    })

    it('returns off live region without atomic', () => {
      const result = getLiveRegionAttributes('off')
      expect(result).toEqual({
        'aria-live': 'off',
        'aria-atomic': false,
      })
    })
  })

  describe('getBusyAttributes', () => {
    it('returns aria-busy true', () => {
      const result = getBusyAttributes(true)
      expect(result).toEqual({ 'aria-busy': true })
    })

    it('returns aria-busy false', () => {
      const result = getBusyAttributes(false)
      expect(result).toEqual({ 'aria-busy': false })
    })
  })

  describe('getExpandedAttributes', () => {
    it('returns aria-expanded true', () => {
      const result = getExpandedAttributes(true)
      expect(result).toEqual({ 'aria-expanded': true })
    })

    it('returns aria-expanded false', () => {
      const result = getExpandedAttributes(false)
      expect(result).toEqual({ 'aria-expanded': false })
    })

    it('returns empty object when undefined', () => {
      const result = getExpandedAttributes(undefined)
      expect(result).toEqual({})
    })
  })

  describe('getPressedAttributes', () => {
    it('returns aria-pressed true', () => {
      const result = getPressedAttributes(true)
      expect(result).toEqual({ 'aria-pressed': true })
    })

    it('returns aria-pressed false', () => {
      const result = getPressedAttributes(false)
      expect(result).toEqual({ 'aria-pressed': false })
    })

    it('returns empty object when undefined', () => {
      const result = getPressedAttributes(undefined)
      expect(result).toEqual({})
    })
  })

  describe('getSelectedAttributes', () => {
    it('returns aria-selected true', () => {
      const result = getSelectedAttributes(true)
      expect(result).toEqual({ 'aria-selected': true })
    })

    it('returns aria-selected false', () => {
      const result = getSelectedAttributes(false)
      expect(result).toEqual({ 'aria-selected': false })
    })

    it('returns empty object when undefined', () => {
      const result = getSelectedAttributes(undefined)
      expect(result).toEqual({})
    })
  })

  describe('getCurrentAttributes', () => {
    it('returns aria-current true', () => {
      const result = getCurrentAttributes(true)
      expect(result).toEqual({ 'aria-current': true })
    })

    it('returns aria-current page', () => {
      const result = getCurrentAttributes('page')
      expect(result).toEqual({ 'aria-current': 'page' })
    })

    it('returns aria-current step', () => {
      const result = getCurrentAttributes('step')
      expect(result).toEqual({ 'aria-current': 'step' })
    })

    it('returns aria-current location', () => {
      const result = getCurrentAttributes('location')
      expect(result).toEqual({ 'aria-current': 'location' })
    })

    it('returns aria-current date', () => {
      const result = getCurrentAttributes('date')
      expect(result).toEqual({ 'aria-current': 'date' })
    })

    it('returns aria-current time', () => {
      const result = getCurrentAttributes('time')
      expect(result).toEqual({ 'aria-current': 'time' })
    })

    it('returns empty object when undefined', () => {
      const result = getCurrentAttributes(undefined)
      expect(result).toEqual({})
    })
  })
})

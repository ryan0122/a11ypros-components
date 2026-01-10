'use client'

import React, { useState, useCallback, useRef } from 'react'
import { createArrowKeyHandler, isNavigationKey, isArrowKey } from '../../utils/keyboard'
import { getExpandedAttributes, getSelectedAttributes, getCurrentAttributes } from '../../utils/aria'
import './Tabs.css'

export interface TabItem {
  id: string
  label: string
  content: React.ReactNode
  disabled?: boolean
}

export interface TabsProps {
  /**
   * Tab items
   */
  items: TabItem[]
  
  /**
   * Default selected tab ID
   */
  defaultSelectedId?: string
  
  /**
   * Controlled selected tab ID
   */
  selectedId?: string
  
  /**
   * Callback when tab selection changes
   */
  onSelectionChange?: (id: string) => void
  
  /**
   * Orientation of tabs
   */
  orientation?: 'horizontal' | 'vertical'
  
  /**
   * Activation mode for tabs
   * - 'automatic': Arrow keys both move focus and activate tabs immediately
   * - 'manual': Arrow keys move focus only, Enter/Space activates the focused tab
   * @default 'automatic'
   */
  activationMode?: 'automatic' | 'manual'
  
  /**
   * Label for the tab list (required for accessibility)
   */
  'aria-label'?: string
  'aria-labelledby'?: string
  
  /**
   * Custom class name
   */
  className?: string
}

/**
 * Accessible Tabs component
 * 
 * WCAG Compliance:
 * - 2.1.1 Keyboard: Arrow key navigation, Home/End support
 * - 4.1.2 Name, Role, Value: ARIA tabs pattern
 * - 2.4.3 Focus Order: Proper focus management
 * 
 * @example
 * ```tsx
 * <Tabs
 *   items={[
 *     { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
 *     { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
 *   ]}
 *   aria-label="Settings tabs"
 * />
 * ```
 */
export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultSelectedId,
  selectedId: controlledSelectedId,
  onSelectionChange,
  orientation = 'horizontal',
  activationMode = 'automatic',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  className = '',
}) => {
  const initialSelectedId = defaultSelectedId || items[0]?.id
  const [internalSelectedId, setInternalSelectedId] = useState(initialSelectedId)
  const [focusedId, setFocusedId] = useState<string | null>(initialSelectedId)
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map())

  const selectedId = controlledSelectedId ?? internalSelectedId
  const selectedIndex = items.findIndex((item) => item.id === selectedId)
  
  // In automatic mode, focused tab is always the selected tab
  // In manual mode, focused tab can be different from selected tab
  const effectiveFocusedId = activationMode === 'automatic' ? selectedId : (focusedId || selectedId)

  const handleSelect = useCallback(
    (id: string) => {
      if (onSelectionChange) {
        onSelectionChange(id)
      } else {
        setInternalSelectedId(id)
      }
      // In manual mode, update focused tab when selecting
      if (activationMode === 'manual') {
        setFocusedId(id)
      }
    },
    [onSelectionChange, activationMode]
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
      const isHorizontal = orientation === 'horizontal'
      let newIndex = currentIndex

      // Handle Enter/Space for manual activation
      if (activationMode === 'manual' && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault()
        const currentTab = items[currentIndex]
        if (currentTab && !currentTab.disabled) {
          handleSelect(currentTab.id)
        }
        return
      }

      // Handle arrow keys and Home/End
      if (isNavigationKey(event.key) || isArrowKey(event.key)) {
        event.preventDefault()

        switch (event.key) {
          case 'Home':
            newIndex = 0
            break
          case 'End':
            newIndex = items.length - 1
            break
          case 'ArrowRight':
            if (isHorizontal) {
              newIndex = (currentIndex + 1) % items.length
            }
            break
          case 'ArrowLeft':
            if (isHorizontal) {
              newIndex = (currentIndex - 1 + items.length) % items.length
            }
            break
          case 'ArrowDown':
            if (!isHorizontal) {
              newIndex = (currentIndex + 1) % items.length
            }
            break
          case 'ArrowUp':
            if (!isHorizontal) {
              newIndex = (currentIndex - 1 + items.length) % items.length
            }
            break
        }

        // Skip disabled tabs
        while (items[newIndex]?.disabled && newIndex !== currentIndex) {
          if (event.key === 'Home' || event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            newIndex = (newIndex + 1) % items.length
          } else {
            newIndex = (newIndex - 1 + items.length) % items.length
          }
        }

        const newTab = items[newIndex]
        if (newTab && !newTab.disabled) {
          if (activationMode === 'automatic') {
            // Automatic: move focus and activate
            handleSelect(newTab.id)
            tabRefs.current.get(newTab.id)?.focus()
          } else {
            // Manual: move focus only
            setFocusedId(newTab.id)
            tabRefs.current.get(newTab.id)?.focus()
          }
        }
      }
    },
    [items, orientation, activationMode, handleSelect]
  )

  const selectedTab = items.find((item) => item.id === selectedId)

  return (
    <div className={['tabs', `tabs--${orientation}`, className].filter(Boolean).join(' ')}>
      <div
        className="tabs-list"
        role="tablist"
        aria-orientation={orientation}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
      >
        {items.map((item, index) => {
          const isSelected = item.id === selectedId
          const isFocused = item.id === effectiveFocusedId
          // In manual mode, focused tab should be focusable even if not selected
          // In automatic mode, only selected tab is focusable
          const tabIndex = activationMode === 'manual' 
            ? (isFocused ? 0 : -1)
            : (isSelected ? 0 : -1)

          return (
            <button
              key={item.id}
              ref={(el) => {
                if (el) {
                  tabRefs.current.set(item.id, el)
                } else {
                  tabRefs.current.delete(item.id)
                }
              }}
              id={`tab-${item.id}`}
              role="tab"
              aria-controls={`tabpanel-${item.id}`}
              aria-selected={isSelected}
              tabIndex={tabIndex}
              disabled={item.disabled}
              className={`tabs-tab ${isSelected ? 'tabs-tab--selected' : ''} ${item.disabled ? 'tabs-tab--disabled' : ''}`}
              onClick={() => !item.disabled && handleSelect(item.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={() => setFocusedId(item.id)}
              {...getCurrentAttributes(isSelected ? 'page' : undefined)}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      {selectedTab && (
        <div
          id={`tabpanel-${selectedTab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${selectedTab.id}`}
          className="tabs-panel"
        >
          {selectedTab.content}
        </div>
      )}
    </div>
  )
}

Tabs.displayName = 'Tabs'


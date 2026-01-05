import React from 'react'
import { createActivationHandler } from '../../utils/keyboard'
import { getAriaLabel, getBusyAttributes } from '../../utils/aria'
import './Button.css'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual variant of the button
   */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  
  /**
   * Size of the button
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Whether the button is in a loading state
   */
  loading?: boolean
  
  /**
   * ARIA label for the button (required if no visible text)
   */
  'aria-label'?: string
}

/**
 * Accessible Button component
 * 
 * WCAG Compliance:
 * - 2.1.1 Keyboard: Full keyboard support (Enter/Space)
 * - 2.4.7 Focus Visible: Clear focus indicators
 * - 4.1.2 Name, Role, Value: Proper ARIA attributes
 * 
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      children,
      className = '',
      onClick,
      onKeyDown,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLButtonElement>) => {
        // Handle activation keys
        const activationHandler = createActivationHandler((e) => {
          if (!isDisabled && onClick) {
            onClick(e as any)
          }
        })
        activationHandler(event)

        // Call user's onKeyDown if provided
        if (onKeyDown) {
          onKeyDown(event)
        }
      },
      [isDisabled, onClick, onKeyDown]
    )

    const ariaProps = {
      ...getAriaLabel(ariaLabel),
      ...getBusyAttributes(loading),
      ...props,
    }

    const classes = [
      'btn',
      `btn--${variant}`,
      `btn--${size}`,
      loading && 'btn--loading',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <button
        ref={ref}
        type="button"
        className={classes}
        disabled={isDisabled}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        aria-disabled={isDisabled}
        {...ariaProps}
      >
        {loading && <span className="btn__spinner" aria-hidden="true">⏳</span>}
        <span className="btn__content">{children}</span>
      </button>
    )
  }
)

Button.displayName = 'Button'


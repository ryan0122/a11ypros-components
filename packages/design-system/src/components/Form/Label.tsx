import React from 'react'
import './Label.css'

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Whether this label is required (shows asterisk)
   */
  required?: boolean
  
  /**
   * ID of the input this label is associated with
   */
  htmlFor?: string
}

/**
 * Accessible Label component
 * 
 * WCAG Compliance:
 * - 1.3.1 Info and Relationships: Proper label-input association
 * - 2.5.3 Label in Name: Label text matches accessible name
 * - 4.1.2 Name, Role, Value: Proper semantic HTML
 * 
 * @example
 * ```tsx
 * <Label htmlFor="email" required>
 *   Email address
 * </Label>
 * <Input id="email" type="email" />
 * ```
 */
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ required = false, className = '', children, ...props }, ref) => {
    const classes = [
      'form-label',
      required && 'form-label--required',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <label ref={ref} className={classes} {...props}>
        {children}
        {required && (
          <span className="form-label__required" aria-hidden="true">
            {' '}*
          </span>
        )}
      </label>
    )
  }
)

Label.displayName = 'Label'


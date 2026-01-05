import React from 'react'
import './Fieldset.css'

export interface FieldsetProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  /**
   * Legend text for the fieldset
   */
  legend?: string
  
  /**
   * Whether the legend is visually hidden (but still accessible)
   */
  legendHidden?: boolean
}

/**
 * Accessible Fieldset component
 * 
 * WCAG Compliance:
 * - 1.3.1 Info and Relationships: Proper fieldset/legend structure
 * - 4.1.2 Name, Role, Value: Proper semantic HTML
 * 
 * @example
 * ```tsx
 * <Fieldset legend="Shipping Address">
 *   <Input label="Street" />
 *   <Input label="City" />
 * </Fieldset>
 * ```
 */
export const Fieldset = React.forwardRef<HTMLFieldSetElement, FieldsetProps>(
  ({ legend, legendHidden = false, className = '', children, ...props }, ref) => {
    const classes = [
      'form-fieldset',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    const legendClasses = [
      'form-legend',
      legendHidden && 'form-legend--hidden',
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <fieldset ref={ref} className={classes} {...props}>
        {legend && (
          <legend className={legendClasses}>
            {legend}
            {props.required && (
              <span className="form-label__required" aria-label="required">
                {' '}*
              </span>
            )}
          </legend>
        )}
        {children}
      </fieldset>
    )
  }
)

Fieldset.displayName = 'Fieldset'


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
  
  /**
   * Whether to show a required field explanation. Use this if the fieldset contains required fields.
   */
  required?: boolean
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
  ({ legend, legendHidden = false, required = false, className = '', children, ...props }, ref) => {
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
          </legend>
        )}
        {required && (
          <p className="fieldset__required">
            {' '}<span className='fieldset__required-indicator'>*</span> indicates a required field.
          </p>
        )}
        {children}
      </fieldset>
    )
  }
)

Fieldset.displayName = 'Fieldset'


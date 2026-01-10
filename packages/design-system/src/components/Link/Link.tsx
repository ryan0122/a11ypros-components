'use client'

import React from 'react'
import './Link.css'

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Whether this is an external link
   * Automatically adds rel="noopener noreferrer" for security
   */
  external?: boolean
  
  /**
   * Whether this is a skip link (for keyboard navigation)
   */
  skip?: boolean
  
  /**
   * ARIA label for the link (required if no visible text)
   */
  'aria-label'?: string
}

/**
 * Accessible Link component
 * 
 * WCAG Compliance:
 * - 2.4.4 Link Purpose: Clear link text or aria-label
 * - 2.4.7 Focus Visible: Clear focus indicators
 * - 4.1.2 Name, Role, Value: Proper semantic HTML
 * 
 * @example
 * ```tsx
 * <Link href="/about" external>
 *   Learn more
 * </Link>
 * ```
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      external = false,
      skip = false,
      href,
      rel,
      target,
      className = '',
      children,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    // Determine if link is external based on href or explicit prop
    const isExternal =
      external ||
      (href && (href.startsWith('http') || href.startsWith('//')))

    // Build rel attribute
    const relAttributes = React.useMemo(() => {
      const attrs = new Set(rel?.split(' ') || [])
      if (isExternal) {
        attrs.add('noopener')
        attrs.add('noreferrer')
      }
      return Array.from(attrs).join(' ')
    }, [isExternal, rel])

    // Set target for external links
    const linkTarget = isExternal && !target ? '_blank' : target

    const classes = [
      'link',
      skip && 'link--skip',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    // Skip links should use button semantics if no href
    if (skip && !href) {
      return (
        <button
          ref={ref as any}
          className={classes}
          aria-label={ariaLabel}
          {...(props as any)}
        >
          {children}
        </button>
      )
    }

    return (
      <a
        ref={ref}
        href={href}
        rel={relAttributes || undefined}
        target={linkTarget}
        className={classes}
        aria-label={ariaLabel ? `${ariaLabel} (opens in new tab)` : isExternal && linkTarget === '_blank' ? `${children} (opens in new tab)` : undefined}
        {...props}
      >
        {children}
        {isExternal && <span className="link__external-icon" aria-hidden="true">{' '}↗</span>}
      </a>
    )
  }
)

Link.displayName = 'Link'


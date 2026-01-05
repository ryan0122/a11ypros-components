/**
 * Motion tokens that respect prefers-reduced-motion
 * All animations should check for reduced motion preference
 */

export const motion = {
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '400ms',
  },
  
  easing: {
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    linear: 'linear',
  },
  
  // Reduced motion overrides (set to 0 or instant)
  reduced: {
    duration: '0ms',
    easing: 'linear',
  },
} as const

export type MotionToken = typeof motion

/**
 * Helper to get motion duration respecting prefers-reduced-motion
 * Usage: const duration = getMotionDuration('normal')
 * In CSS: use @media (prefers-reduced-motion: reduce) { animation-duration: 0ms; }
 */
export function getMotionDuration(key: keyof typeof motion.duration): string {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return motion.reduced.duration
  }
  return motion.duration[key]
}


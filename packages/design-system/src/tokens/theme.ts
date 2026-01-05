/**
 * Central theme export combining all design tokens
 */
import { colors } from './colors'
import { spacing } from './spacing'
import { typography } from './typography'
import { motion } from './motion'
import { breakpoints } from './breakpoints'

export const theme = {
  colors,
  spacing,
  typography,
  motion,
  breakpoints,
} as const

export type Theme = typeof theme


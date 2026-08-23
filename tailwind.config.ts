import type { Config } from 'tailwindcss';
import { colors } from './src/tokens/colors';
import { fontFamilies, typeScale } from './src/tokens/typography';
import { spacing } from './src/tokens/spacing';
import { radii } from './src/tokens/radii';
import { shadows } from './src/tokens/shadows';
import { breakpoints } from './src/tokens/breakpoints';

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: colors.background,
        surface: colors.surface,
        foreground: colors.foreground,
        'muted-foreground': colors.mutedForeground,
        primary: colors.primary,
        secondary: colors.secondary,
        tertiary: colors.tertiary, // Brass accent
        border: colors.border,
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
        'primary-text': colors.primaryText,

        // shadcn/ui primitive remappings pointing strictly to M2 tokens (no new colors invented)
        'primary-foreground': colors.surface,
        'secondary-foreground': colors.surface,
        input: colors.border,
        ring: colors.primary,
        accent: colors.background,
        'accent-foreground': colors.foreground,
        muted: colors.background,
        destructive: colors.error,
        'destructive-foreground': colors.surface,
      },
      fontFamily: {
        display: [fontFamilies.display, 'serif'],
        sans: [fontFamilies.sans, 'sans-serif'],
      },
      fontSize: {
        'display-xl': [typeScale['display-xl'].fontSize, { lineHeight: typeScale['display-xl'].lineHeight }],
        'display-lg': [typeScale['display-lg'].fontSize, { lineHeight: typeScale['display-lg'].lineHeight }],
        'display-md': [typeScale['display-md'].fontSize, { lineHeight: typeScale['display-md'].lineHeight }],
        'heading-lg': [typeScale['heading-lg'].fontSize, { lineHeight: typeScale['heading-lg'].lineHeight }],
        'heading-md': [typeScale['heading-md'].fontSize, { lineHeight: typeScale['heading-md'].lineHeight }],
        'heading-sm': [typeScale['heading-sm'].fontSize, { lineHeight: typeScale['heading-sm'].lineHeight }],
        'body-lg': [typeScale['body-lg'].fontSize, { lineHeight: typeScale['body-lg'].lineHeight }],
        'body-md': [typeScale['body-md'].fontSize, { lineHeight: typeScale['body-md'].lineHeight }],
        'body-sm': [typeScale['body-sm'].fontSize, { lineHeight: typeScale['body-sm'].lineHeight }],
        caption: [typeScale['caption'].fontSize, { lineHeight: typeScale['caption'].lineHeight }],
      },
      spacing: {
        ...spacing,
      },
      borderRadius: {
        soft: radii.soft,
        none: radii.none,
      },
      boxShadow: {
        card: shadows.card,
        drawer: shadows.drawer,
      },
      // BREAKPOINTS MAPPING (Section 23)
      // xs: 360px  - Base / Mobile devices
      // sm: 768px  - Tablet devices
      // md: 1024px - Intermediate Desktop Small
      // lg: 1280px - Primary Desktop Medium
      // xl: 1440px - Large Desktop
      screens: {
        xs: breakpoints.xs,
        sm: breakpoints.sm,
        md: breakpoints.md,
        lg: breakpoints.lg,
        xl: breakpoints.xl,
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
} satisfies Config;

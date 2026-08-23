// PLACEHOLDER — final typeface TBD per blueprint §36
export const fontFamilies = {
  display: '"Source Serif 4", Georgia, serif',
  sans: '"Inter", system-ui, sans-serif',
} as const;

export const typeScale = {
  'display-xl': { fontSize: '64px', lineHeight: '1.05' },
  'display-lg': { fontSize: '48px', lineHeight: '1.1' },
  'display-md': { fontSize: '36px', lineHeight: '1.15' },
  'heading-lg': { fontSize: '28px', lineHeight: '1.2' },
  'heading-md': { fontSize: '22px', lineHeight: '1.3' },
  'heading-sm': { fontSize: '18px', lineHeight: '1.4' },
  'body-lg': { fontSize: '18px', lineHeight: '1.6' },
  'body-md': { fontSize: '16px', lineHeight: '1.6' },
  'body-sm': { fontSize: '14px', lineHeight: '1.5' },
  caption: { fontSize: '12px', lineHeight: '1.4' },
} as const;

export type FontFamilies = typeof fontFamilies;
export type TypeScale = typeof typeScale;

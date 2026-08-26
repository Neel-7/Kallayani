// Considered brand choice (Fashion Didone direction) per blueprint §36 & DESIGN_AUDIT.md.
// Chosen for dramatic high-contrast stroke weights and refined editorial visual scale.
export const fontFamilies = {
  display: '"GT Sectra", "Times New Roman", serif',
  sans: '"GT America", "Helvetica Neue", sans-serif',
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

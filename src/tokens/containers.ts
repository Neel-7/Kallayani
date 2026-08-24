/**
 * Container widths for the layout wrappers per blueprint §29.
 *
 * Naming matches Section 29's small set of max-widths:
 * - content: standard responsive content wrapper (approx 1280px / 80rem)
 * - wide: extended hero/catalog layouts (approx 1440px / 90rem)
 * - full-bleed: edge-to-edge layouts (100% width, no maximum cap)
 */
export const containerWidths = {
  content: '1280px',
  wide: '1440px',
  'full-bleed': '100%',
} as const;

export type ContainerWidths = typeof containerWidths;

export const breakpoints = {
  xs: '360px',
  sm: '768px',
  md: '1024px',
  lg: '1280px',
  xl: '1440px',
} as const;

export type Breakpoints = typeof breakpoints;

export const colors = {
  background: '#F7F3EC',
  surface: '#FFFDF9',
  foreground: '#241F1C',
  mutedForeground: '#7A716A',
  primary: '#B23A2E',
  secondary: '#5C2A2E',
  tertiary: '#B08D57', // Brass accent
  border: '#E7E0D6',
  success: '#6B7A5E',
  warning: '#C97D4A',
  error: '#A6342A',
  primaryText: '#8E2E24', // Darkened primary variant for normal/body text use
  mutedSurface: '#EFE9DE', // Deeper warm-neutral step for muted elements and hover states
} as const;

export type Colors = typeof colors;

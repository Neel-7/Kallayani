import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from 'src/store/store';

export interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * Providers is the single, designated global composition root for all app-wide providers
 * (e.g. state management, theme providers, alert overlays, etc.).
 *
 * NOTE: This wraps the Router root compositionally inside main.tsx.
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <React.StrictMode>
      <Provider store={store}>{children}</Provider>
    </React.StrictMode>
  );
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App.tsx';

async function bootstrap() {
  // Gated behind development/mock mode to prevent MSW scripts loading in production/live environments.
  if (import.meta.env.VITE_API_MODE === 'mock') {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass', // Bypass unhandled requests to static assets, hot-reloads, etc.
      serviceWorker: {
        url: '/mockServiceWorker.js', // Target generated MSW service worker asset
      },
    });
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

bootstrap();

import { Providers } from 'src/app/providers';
import { AppRouter } from 'src/app/router';

function App() {
  // App serves as the root composition entrypoint, mounting the global Providers and AppRouter.
  // The old diagnostic toggler header has been fully retired and relocated behind dev-only routes.
  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
}

export default App;

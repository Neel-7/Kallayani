import { Outlet } from 'react-router-dom';
import { Container } from 'src/components/shared/Container';
import { Button } from 'src/components/ui/button';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { setAuth } from 'src/store/slices/authSlice';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

/**
 * ProtectedRoute guards sensitive client views (e.g. account settings) per blueprint §18.
 * It reads the lightweight Redux auth session state. If false, displays a calm, on-brand login prompt.
 *
 * NOTE: The "Sign In" button here is temporary scaffolding that directly flips the auth stub state,
 * pending real secure authentication protocols in subsequent milestones.
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const handleMockSignIn = () => {
    // Temporary scaffolding: Simulate a successful authentication event with a mock profile
    dispatch(
      setAuth({
        user: {
          id: 'user_001',
          email: 'patricia@example.com',
        },
      }),
    );
  };

  if (!isAuthenticated) {
    return (
      <Container className="py-[80px] max-w-[480px] text-center space-y-[24px]">
        <div className="space-y-[12px]">
          <h2 className="text-heading-md font-semibold tracking-tight text-primary-text font-sans">
            Sign in to your account
          </h2>
          <p className="text-body-sm text-muted-foreground font-sans">
            To view your orders, manage shipping destinations, and configure your luxury sizing preferences, please sign in.
          </p>
        </div>
        <Button onClick={handleMockSignIn} className="w-full">
          Sign In (Scaffolding)
        </Button>
      </Container>
    );
  }

  return children ? <>{children}</> : <Outlet />;
}

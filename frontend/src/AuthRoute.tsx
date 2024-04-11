import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/userAuth';

interface AuthRouteProps {
  component: React.ComponentType<unknown>;
}

const AuthRoute: React.FC<AuthRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const location = useLocation();
  const { auth } = useAuth();

  if (!Component) return null;

  if (auth?.isLoggedIn && location.pathname === '/auth/verify/number') {
    return <Navigate to={location.state?.from || '/'} replace />;
  }

  return <Component {...rest} />;
};

export default AuthRoute;

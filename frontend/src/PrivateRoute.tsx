import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/userAuth';
import TopBar from './components/shared/Topbar';
import Sidebar from './components/shared/Sidebar';

interface PrivateRouteProps {
  component: React.ComponentType<unknown>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const location = useLocation();
  const { auth } = useAuth();

  if (!Component) return null;

  return auth?.isLoggedIn ? (
    <React.Fragment>
      <section className="h-full md:overflow-hidden">
        <div className="md:flex md:flex-row  w-screen">
          <Sidebar />
          <div className="md:flex-1 w-full flex-row md:overflow-hidden">
            <div className="hidden md:block">
              <TopBar />
            </div>
            <Component {...rest} />
          </div>
        </div>
      </section>
    </React.Fragment>
  ) : (
    <Navigate to="/auth/verify/number" state={{ from: location }} replace />
  );
};

export default PrivateRoute;

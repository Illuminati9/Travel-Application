import { useState } from 'react';
import { AuthContext, AuthType } from './userContext';
import { getCookie } from '@/hooks/getCookie';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthType>({
    accessToken: getCookie('Travel_application_access') ?? null,
    refreshToken: getCookie('Travel_application_refresh') ?? null,
    isLoggedIn: !!getCookie('Travel_application_access'),
  });
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

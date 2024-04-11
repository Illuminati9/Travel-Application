import { useContext } from 'react';
import { AuthContext } from '@/context/userContext';

export const useAuth = () => {
  return useContext(AuthContext);
};

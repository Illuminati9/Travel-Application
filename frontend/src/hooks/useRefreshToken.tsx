import axios from 'axios';
import { useAuth } from './userAuth.tsx';

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/auth/refreshRoute`,
        {
          withCredentials: true,
        },
      );
      console.log(response);
      setAuth((prev) => {
        return {
          ...prev,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refToken,
        };
      });
      return response.data.accessToken;
    } catch (error) {
      console.log('Error in refresh token', error);
    }
  };
  return refresh;
};

export default useRefreshToken;

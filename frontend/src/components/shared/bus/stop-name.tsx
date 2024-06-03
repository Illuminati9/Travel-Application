import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const StopName = ({ id }: { id: string }) => {
  const [stopName, setStopName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getStopName = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/admin/stop/${id}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get('Travel_application_access')}`,
            },
          },
        );
        console.log(
          'this is the stopName in the stop',
          response.data.stop.city,
        );
        isMounted && setStopName(response.data.stop.city);
      } catch (err) {
        console.error('This is the error', err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    getStopName();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [id]);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return <>{stopName}</>;
};

export default StopName;

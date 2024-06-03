import { useEffect, useState } from 'react';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useLocation } from 'react-router-dom';
import Loading from './Loading';

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  accountType: string;
  booking: unknown[];
  active: boolean;
  approved: boolean;
  additionalDetails: {
    _id: string;
    gender: string;
    dateOfBirth: string | null;
    about: string | null;
    contactNumber: string | null;
    __v: number;
  };
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const UserIdPage = () => {
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
      try {
        const response = await axiosPrivate.get(
          `/api/v1/admin/owner/${location.pathname.split('/')[4]}`,
        );
        console.log('User details', response.data.user);
        isMounted && setUser(response.data.user);
      } catch (err) {
        console.error('This is the error', err);
      } finally {
        isMounted && setLoading(false);
      }
    };

    getUser();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, location.pathname]);

  if (loading) {
    return <Loading width={150} height={150} className="text-2xl" />;
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md dark:bg-gray-950 dark:text-gray-50">
          <div className="flex items-center gap-4 p-4 md:p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="w-12 h-12 md:w-16 md:h-16">
              <img
                src={user?.image}
                alt={`${user?.firstName} ${user?.lastName}`}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="grid gap-1">
              <h2 className="text-xl font-semibold capitalize">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                @ {user?.email}
              </p>
              <p>
                <span className="text-sm font-semibold ">
                  Account Type:{' '}
                  <span className="uppercase">{user?.accountType}</span>
                </span>
              </p>
            </div>
          </div>
          <div className="p-4 md:p-6 grid grid-cols-2 gap-4">
            <div className="grid gap-1">
              <h3 className="text-base font-semibold">Phone Number</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user?.phoneNumber}
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-base font-semibold">Date Of birth</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user?.additionalDetails.dateOfBirth || 'Not provided'}
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-base font-semibold">Contact number</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user?.additionalDetails.contactNumber || 'Not provided'}
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-base font-semibold">Gender</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user?.additionalDetails.gender || 'Not provided'}
              </p>
            </div>
          </div>
          <div className="p-4 md:p-6 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold mb-4">Bookings</h3>
            {/* <div className="max-h-40 overflow-y-auto">
              {user?.booking.map((booking,index) => (
                <div key={index} className="mb-2">
                </div>
              ))}
            </div> */}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md dark:bg-gray-950 dark:text-gray-50 flex items-center justify-center">
          <img
            src={user?.image}
            alt="Profile Picture"
            width={400}
            height={400}
            className="max-w-full h-auto object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default UserIdPage;

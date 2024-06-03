// BusPage.tsx
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Bus, Owner } from './types.ts';
import Loading from '../Loading.tsx';

const BusPage = () => {
  const location = useLocation();
  const [bus, setBus] = useState<Bus | null>(null);
  const [owner, setOwner] = useState<Owner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getBus = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/admin/bus/${location.pathname.split('/')[4]}`,
          {
            signal: controller.signal,
            headers: {
              Authorization: `Bearer ${Cookies.get('Travel_application_access')}`,
            },
          },
        );
        console.log('Bus details', response.data.bus);
        if (isMounted) {
          setBus(response.data.bus);
          setOwner(response.data.owner);
        }
      } catch (err) {
        console.error('This is the error', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getBus();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [location.pathname]);

  if (loading) return <Loading width={150} height={150} className="text-2xl" />;
  if (!bus || !owner) {
    return <Loading width={150} height={150} className="text-2xl" />;
  }
  
  return (
    <section>
      <div className="p-2 bg-gray-100 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Bus Details</h2>
            <p>
              <span className="font-semibold">Name:</span> {bus.name}
            </p>
            <p>
              <span className="font-semibold">Number:</span> {bus.number}
            </p>
            <p>
              <span className="font-semibold">Seat Capacity:</span>{' '}
              {bus.seatCapacity}
            </p>
            <p>
              <span className="font-semibold">Bus Type:</span>{' '}
              {bus.busDetails.busType}
            </p>
            <p>
              <span className="font-semibold">Fuel Type:</span>{' '}
              {bus.busDetails.fuelType}
            </p>
            <p>
              <span className="font-semibold">Fuel Capacity:</span>{' '}
              {bus.busDetails.fuelCapacity}
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Route Details</h2>
            <div>
              <h3 className="text-xl font-semibold">Source Stop</h3>
              <p>
                <span className="font-semibold">Name:</span>{' '}
                {bus.sourceStop.stopName}
              </p>
              <p>
                <span className="font-semibold">City:</span>{' '}
                {bus.sourceStop.city}
              </p>
              <p>
                <span className="font-semibold">Pincode:</span>{' '}
                {bus.sourceStop.pincode}
              </p>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Destination Stop</h3>
              <p>
                <span className="font-semibold">Name:</span>{' '}
                {bus.destinationStop.stopName}
              </p>
              <p>
                <span className="font-semibold">City:</span>{' '}
                {bus.destinationStop.city}
              </p>
              <p>
                <span className="font-semibold">Pincode:</span>{' '}
                {bus.destinationStop.pincode}
              </p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Parking Address</h2>
            <p>
              <span className="font-semibold">Street:</span>{' '}
              {bus.parkingAddress.street}
            </p>
            <p>
              <span className="font-semibold">City:</span>{' '}
              {bus.parkingAddress.city}
            </p>
            <p>
              <span className="font-semibold">State:</span>{' '}
              {bus.parkingAddress.state}
            </p>
            <p>
              <span className="font-semibold">Country:</span>{' '}
              {bus.parkingAddress.country}
            </p>
            <p>
              <span className="font-semibold">Pincode:</span>{' '}
              {bus.parkingAddress.pincode}
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Owner Details</h2>
            <div className="flex items-center mb-4">
              <img
                src={owner.image}
                alt={`${owner.firstName} ${owner.lastName}`}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h3 className="text-xl font-semibold">
                  {owner.firstName} {owner.lastName}
                </h3>
                <p>
                  <span className="font-semibold">Phone:</span>{' '}
                  {owner.phoneNumber}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {owner.email}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Owner Details</h3>
              <p>
                <span className="font-semibold">Name:</span>{' '}
                {owner.ownerDetails.name}
              </p>
              <p>
                <span className="font-semibold">Age:</span>{' '}
                {owner.ownerDetails.age}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusPage;

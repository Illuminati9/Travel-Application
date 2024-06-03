import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import React, { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Loading from './Loading';
import axios from 'axios';
import Cookies from 'js-cookie';
import StopName from './bus/stop-name';
import { Link } from 'react-router-dom';

interface Bus {
  _id: string;
  name: string;
  number: string;
  seatCapacity: number;
  seats: unknown[];
  sourceStop: string;
  destinationStop: string;
  stops: unknown[];
  parkingAddress: string;
  staffId: string[];
  ownerId: string;
  busDetails: string;
  __v: number;
}
const BusRoutes = () => {
  const [buses, setBuses] = React.useState<Bus>();
  const [isLoading, setisLoading] = React.useState(true);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getBus = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/admin/buses/`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get('Travel_application_access')}`,
            },
          },
        );
        isMounted && setBuses(response.data.buses);
      } catch (err) {
        console.error('This is the error', err);
      } finally {
        isMounted && setisLoading(false);
      }
    };

    getBus();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate]);

  console.table(buses);

  if (isLoading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Bus name</TableHead>
            <TableHead>Number</TableHead>
            <TableHead>Seat capacity</TableHead>
            <TableHead>Source stop</TableHead>
            <TableHead>Dest stop</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={4}>
              <Loading width={40} height={40} className="text-md" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Bus name</TableHead>
          <TableHead>Number</TableHead>
          <TableHead>Seat capacity</TableHead>
          <TableHead>Source stop</TableHead>
          <TableHead>Dest. stop</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(buses as unknown as Bus[])?.map((bus: Bus) => (
          <TableRow key={bus._id}>
            <TableCell className=" capitalize">
              <Link to={`/admin/bus/routes/${bus._id}`}>{bus.name}</Link>
            </TableCell>
            <TableCell>{bus.number}</TableCell>
            <TableCell>{bus.seatCapacity}</TableCell>
            <TableCell>
              <StopName id={bus.sourceStop} />
            </TableCell>
            <TableCell>
              <StopName id={bus.destinationStop} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BusRoutes;

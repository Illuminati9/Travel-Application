import { useEffect, useState } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Input } from "../ui/input";
import Loading from "./Loading";
import { useLocation } from "react-router-dom";

type user = {
  _id: string;
  firstName: string;
  lastName: string;
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
  const [user, setUser] = useState<user>();
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
      try {
        const response = await axiosPrivate.get(
          `/api/v1/admin/user/${location.pathname.split("/")[3]}`
        );
        console.log("User details", response.data.user);
        isMounted && setUser(response.data.user);
      } catch (err) {
        console.error("This is the error", err);
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
    <section className="flex items-center justify-center h-full">
      <div className="m-1 shadow-md w-full lg:max-w-lg lg:p-2 sm:p-8 bg-white rounded-lg ">
        <div className="flex flex-col gap-x-3">
          <div className="flex items-center justify-center w-full h-full">
            <img
              src={user?.image}
              alt="user"
              className=" md:h-1/4 md:w-1/4 rounded-full"
            />
          </div>
          <div className="flex flex-col gap-y-2 p-2">
            <div>
              <span className="m-1">First name :</span>
              <Input value={user?.firstName} readOnly />
            </div>
            <div>
              <span className="m-1">Last name :</span>
              <Input value={user?.lastName} readOnly />
            </div>
            <div>
              <span className="m-1">Phone number :</span>
              <Input value={user?.phoneNumber} readOnly />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserIdPage;

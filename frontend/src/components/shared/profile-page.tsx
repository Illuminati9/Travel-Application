import { useEffect, useState } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Loading from "./Loading";

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

const ProfilePage = () => {
  const [user, setUser] = useState<user>();
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
      try {
        const response = await axiosPrivate.get(
          `/api/v1/profile/getUserDetails`
        );
        console.log("User details", response.data.userDetails);
        isMounted && setUser(response.data.userDetails);
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
  }, [axiosPrivate]);

  if (loading) {
    return <Loading width={150} height={150} className="text-2xl" />;
  }

  const handleLogout = async () => {
    try {
      const response = await axiosPrivate.post(`/api/v1/auth/logout`);

      if (response.status === 204) {
        window.location.href = "/auth/verify/number";
      }
    } catch (err) {
      console.error("Error during logout", err);
    }
  };

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
        <Button
          onClick={handleLogout}
          className="w-full mt-4"
          variant={"destructive"}
        >
          Log Out
        </Button>
      </div>
    </section>
  );
};

export default ProfilePage;

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExitIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

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

const TopBar = () => {
  const [user, setUser] = useState<user>();
  const [isPending, setIsPending] = useState<boolean>(true);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
      try {
        const response = await axiosPrivate.get(
          `/api/v1/profile/getUserDetails`
        );
        isMounted && setUser(response.data.userDetails);
      } catch (err) {
        console.error("This is the rror", err);
      } finally {
        isMounted && setIsPending(false);
      }
    };
    getUser();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate]);

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
    <nav className="md:flex md:items-center md:justify-between bg-gray-50 ">
      <div className="hidden md:block ml-2 "></div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {isPending ? (
            <svg
              viewBox="0 0 800 800"
              xmlns="http://www.w3.org/2000/svg"
              width={50}
              height={50}
            >
              <circle
                className="spinLoader2"
                cx="400"
                cy="400"
                fill="none"
                r="109"
                strokeWidth="35"
                stroke="#000000"
                strokeDasharray="685 1400"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <img
              src={user?.image}
              alt={user?.firstName}
              className=" h-14 w-14 rounded-full p-2 cursor-pointer"
            />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="m-1 w-48">
          <DropdownMenuLabel className="capitalize">
            {user?.firstName}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <button
              className="flex items-center justify-center"
              onClick={handleLogout}
            >
              <ExitIcon className="h-4 w-4 mr-2 cursor-pointer" />
              Logout
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default TopBar;

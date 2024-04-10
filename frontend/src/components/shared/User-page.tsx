import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loading from "./Loading";
import { Link } from "react-router-dom";

type User = {
  accountType: string;
  active: boolean;
  additionalDetails: string;
  approved: boolean;
  booking: unknown[];
  createdAt: string;
  firstName: string;
  image: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  updatedAt: string;
  __v: number;
  _id: string;
};

const UserPage = () => {
  const [users, setUsers] = React.useState<User>();
  const [isLoading, setisLoading] = React.useState(true);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUser = async () => {
      try {
        const response = await axiosPrivate.get(`/api/v1/admin/users/`);
        console.log("User details in the UserPage", response.data.users);
        isMounted && setUsers(response.data.users);
      } catch (err) {
        console.error("This is the error", err);
      } finally {
        isMounted && setisLoading(false);
      }
    };
    getUser();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate]);

  if (isLoading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First name</TableHead>
            <TableHead>Last name</TableHead>
            <TableHead>Mobile Number</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Active</TableHead>
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
          <TableHead>User Id </TableHead>
          <TableHead>First name</TableHead>
          <TableHead>Last name</TableHead>
          <TableHead>Mobile Number</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Active</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(users as unknown as User[])?.map((user: User) => (
          <TableRow key={user._id}>
            <TableCell>
              <Link to={`/admin/user/${user._id}`}>
                {user._id.slice(0, 10)}
              </Link>
            </TableCell>
            <TableCell className=" capitalize">{user.firstName}</TableCell>
            <TableCell>{user.lastName}</TableCell>
            <TableCell>{user.phoneNumber}</TableCell>
            <TableCell>
              {user.accountType === "aDMIn"
                ? "Admin"
                : user.accountType === "oWnEr"
                ? "Owner"
                : user.accountType === "stAFf"
                ? "Staff"
                : "User"}
            </TableCell>
            <TableCell>{user.active ? "Active" : "Inactive"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserPage;

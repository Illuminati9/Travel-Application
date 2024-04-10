import React from "react";
import { Link } from "react-router-dom";

const NavItems = () => {
  return (
    <ul className="space-y-2 font-medium">
      <li>
        <Link
          to={`/admin/user/`}
          className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 "
        >
          <span className="flex-1 ms-3 whitespace-nowrap font-semibold text-lg">
            users
          </span>
        </Link>
      </li>
      <li>
        <Link
          to={`/admin/user/owners/`}
          className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 "
        >
          <span className="flex-1 ms-3 whitespace-nowrap font-semibold text-lg">
            Owners
          </span>
        </Link>
      </li>
      <li>
        <Link
          to={`/admin/bus/routes`}
          className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 "
        >
          <span className="flex-1 ms-3 whitespace-nowrap font-semibold text-lg">
            bus
          </span>
        </Link>
      </li>
      <li>
        <Link
          to={`/admin/auth/profile/`}
          className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100 "
        >
          <span className="flex-1 ms-3 whitespace-nowrap font-semibold text-lg">
            Profile
          </span>
        </Link>
      </li>
    </ul>
  );
};

export default NavItems;

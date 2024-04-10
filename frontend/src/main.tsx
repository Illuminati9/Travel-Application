import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./components/shared/auth/login-page.tsx";
import RegisterForm from "./components/shared/auth/register-page.tsx";
import OTPForm from "./components/shared/auth/otp-page.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";
import PrivateRoute from "./PrivateRoute.tsx";
import { AuthProvider } from "./context/UserContextProvider.tsx";
import AuthRoute from "./AuthRoute.tsx";
import ProfilePage from "./components/shared/profile-page.tsx";
import UserPage from "./components/shared/User-page.tsx";
import UserPageId from "./components/shared/UserID-page.tsx";
import BusRoutes from "./components/shared/bus-routes.tsx";
import OwnersPage from "./components/shared/owners-page.tsx";
import OwnerIdPage from "./components/shared/ownerid-page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute component={App} />,
  },
  {
    path: "/auth/verify/number",
    element: <AuthRoute component={OTPForm} />,
  },
  {
    path: "/auth/login/",
    element: <AuthRoute component={LoginForm} />,
  },
  {
    path: "/auth/signup/",
    element: <AuthRoute component={RegisterForm} />,
  },
  {
    path: "/admin/auth/profile/",
    element: <PrivateRoute component={ProfilePage} />,
  },
  {
    path: "/admin/user/",
    element: <PrivateRoute component={UserPage} />,
  },
  {
    path: "/admin/user/:id",
    element: <PrivateRoute component={UserPageId} />,
  },
  {
    path: "/admin/user/owners/:id",
    element: <PrivateRoute component={OwnerIdPage} />,
  },
  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  },
  {
    path: "/admin/user/owners/",
    element: <PrivateRoute component={OwnersPage} />,
  },
  {
    path: "/admin/bus/routes/",
    element: <PrivateRoute component={BusRoutes} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  </React.StrictMode>
);

import React from "react";
import TopBar from "./components/shared/Topbar";
import { useLocation } from "react-router-dom";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  if (location.pathname === "/auth/verify/number") {
    return <>{children}</>;
  }

  return (
    <>
      <TopBar />
      {children}
    </>
  );
};

export default Layout;

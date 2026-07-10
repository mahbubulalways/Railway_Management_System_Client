"use client";

import useRestrictedPath from "@/hooks/useRestrictedPath";
import Navbar from "./Navbar";

const MainNavbar = () => {
  const isRestricted = useRestrictedPath();
  if (isRestricted) {
    return;
  }
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default MainNavbar;

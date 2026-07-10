"use client";

import { usePathname } from "next/navigation";

const restrictedPaths = [
  "/login",
  "/dashboard",
  "/register",
  "/forgot-password",
  "/reset-password",
];

const useRestrictedPath = () => {
  const pathname = usePathname();
  return restrictedPaths.some((path) => pathname.startsWith(path));
};

export default useRestrictedPath;

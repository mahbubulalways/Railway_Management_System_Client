"use client";

import { usePermissionStore } from "@/zustand/store/usePermissionStore";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const StaffPermissionGuard = ({ children }: { children: ReactNode }) => {
  const { hasAnyPermission, isLoaded } = usePermissionStore();
  const pathname = usePathname();
  const router = useRouter();

  const publicRoutes = [
    "/dashboard/staff/settings",
    "/dashboard/staff/info",
    "/dashboard/staff/profile",
    "/dashboard/staff/home",
  ];
  const isPublic = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const hasPermission = isPublic || hasAnyPermission(pathname);
  useEffect(() => {
    if (!isLoaded) return;
    if (!hasPermission) {
      router.replace("/dashboard/staff/info");
    }
  }, [hasPermission, router, isLoaded]);

  if (!hasPermission) return null;

  return <>{children}</>;
};

export default StaffPermissionGuard;

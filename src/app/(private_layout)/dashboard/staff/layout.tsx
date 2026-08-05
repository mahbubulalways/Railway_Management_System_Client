import StaffPermissionGuard from "@/layout/DashboardLayout/StaffPermissionGuard";
import { ReactNode } from "react";

const StaffLayout = ({ children }: { children: ReactNode }) => {
  return <StaffPermissionGuard>{children}</StaffPermissionGuard>;
};

export default StaffLayout;

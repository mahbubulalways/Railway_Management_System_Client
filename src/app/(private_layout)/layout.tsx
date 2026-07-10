import DashboardLayout from "@/layout/DashboardLayout/DashboardDrawer";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <DashboardLayout>{children}</DashboardLayout>
    </div>
  );
};

export default Layout;

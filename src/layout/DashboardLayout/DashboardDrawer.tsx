"use client";

import { ReactNode, useState } from "react";
import AdminDashboardNavbar from "./DashboardNavbar";
import AdminSidebarDrawer from "./DashboardSidebar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebarDrawer open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="lg:pl-72">
        <AdminDashboardNavbar setSidebarOpen={setSidebarOpen} />

        <main
          className="
          min-h-[calc(100vh-7pl-72px)]
          p-4
          sm:p-6
          overflow-x-hidden
          "
        >
          <div className="mx-auto max-w-[1600px]">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

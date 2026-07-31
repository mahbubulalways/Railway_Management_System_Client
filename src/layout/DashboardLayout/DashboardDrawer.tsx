"use client";

import { ReactNode, useState } from "react";
import AdminDashboardNavbar from "./DashboardNavbar";
import AdminSidebarDrawer from "./DashboardSidebar";
import { JwtTokenPayload } from "@/interface/token";
import PermissionInitializer from "./PermissionInitializer";

const DashboardLayout = ({
  children,
  user,
}: {
  children: ReactNode;
  user: JwtTokenPayload | null;
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebarDrawer
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        user={user}
      />

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
      <PermissionInitializer user={user} />
    </div>
  );
};

export default DashboardLayout;

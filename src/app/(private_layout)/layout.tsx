import { JwtTokenPayload } from "@/interface/token";
import DashboardLayout from "@/layout/DashboardLayout/DashboardDrawer";
import { decodedToken } from "@/utils/jwt_decode";
import { cookies } from "next/headers";
import React, { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user = token ? (decodedToken(token) as JwtTokenPayload) : null;

  return (
    <div>
      <DashboardLayout user={user}>{children}</DashboardLayout>
    </div>
  );
};

export default Layout;

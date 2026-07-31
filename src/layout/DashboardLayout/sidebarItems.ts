"use client";
import { IStaffPermission } from "@/interface/staff-type";
import { JwtTokenPayload } from "@/interface/token";
import { USER_ROLE } from "@/interface/user";
import { usePermissionStore } from "@/zustand/store/usePermissionStore";

export interface ISidebarItem {
  label: string;
  path?: string;
  children?: ISidebarItem[];
  icon?: React.ReactNode | string;
}

export const useGenerateSidebarItems = (user: JwtTokenPayload | null) => {
  const isStaff = user?.role === "STAFF";
  const { permissions } = usePermissionStore();

  const format = isStaff
    ? permissions?.map((d: IStaffPermission) => {
        const permission = d.permission?.permission;
        const formattedLabel = permission
          ?.toLowerCase()
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char: string) => char.toUpperCase());
        const formattedPath = permission?.toLowerCase().replace(/_/g, "-");

        return {
          label: formattedLabel,
          icon: "LayoutDashboard",
          path: `/dashboard/staff/${formattedPath}`,
        };
      })
    : [];

  const sidebarItems: ISidebarItem[] = [];
  switch (user?.role) {
    case USER_ROLE.ADMIN:
      sidebarItems.push(
        {
          label: "Dashboard",
          icon: "LayoutDashboard",
          path: "/dashboard/admin",
        },

        // Station
        {
          label: "Station Management",
          icon: "MapPin",
          children: [
            {
              label: "All Stations",
              path: "/dashboard/admin/stations",
            },
            {
              label: "Create Station",
              path: "/dashboard/admin/stations/create",
            },
          ],
        },
        // Route Management
        {
          label: "Route Management",
          icon: "Route",
          children: [
            {
              label: "All Routes",
              path: "/dashboard/admin/routes",
            },
            {
              label: "Create Route",
              path: "/dashboard/admin/routes/create",
            },
          ],
        },

        // Coach
        {
          label: "Coach Management",
          icon: "Coach",
          children: [
            {
              label: "Coach Models",
              path: "/dashboard/admin/coaches/model",
            },
            {
              label: "Create Model",
              path: "/dashboard/admin/coaches/model/create",
            },

            {
              label: "All Coaches",
              path: "/dashboard/admin/coaches",
            },

            {
              label: "Assigned coaches",
              path: "/dashboard/admin/coaches/assigned",
            },

            {
              label: "Available coaches",
              path: "/dashboard/admin/coaches/available",
            },
            {
              label: "Maintenance coaches",
              path: "/dashboard/admin/coaches/maintenance",
            },
          ],
        },
        // Train
        {
          label: "Train Management",
          icon: "Train",
          children: [
            {
              label: "All Trains",
              path: "/dashboard/admin/trains",
            },

            {
              label: "Train Schedule",
              path: "/dashboard/admin/trains/schedule",
            },
          ],
        },

        // Ticket
        {
          label: "Ticket Management",
          icon: "Ticket",
          children: [
            {
              label: "All Tickets",
              path: "/dashboard/admin/tickets",
            },
            {
              label: "Bookings",
              path: "/dashboard/admin/tickets/bookings",
            },
            {
              label: "Cancel Requests",
              path: "/dashboard/admin/tickets/cancel",
            },
            {
              label: "Refunds",
              path: "/dashboard/admin/tickets/refunds",
            },
          ],
        },

        // Users/Admin
        {
          label: "Admin Management",
          icon: "Users",
          children: [
            {
              label: "Create Admin",
              path: "/dashboard/admin/create-admin",
            },
          ],
        },

        // Employee
        {
          label: "Staff Management",
          icon: "UserCog",
          children: [
            {
              label: "All Staffs",
              path: "/dashboard/admin/staffs",
            },
            {
              label: "Staff Types",
              path: "/dashboard/admin/staff-types",
            },
            {
              label: "Permissions",
              path: "/dashboard/admin/permissions",
            },
          ],
        },

        // Reports
        {
          label: "Reports",
          icon: "ChartBar",
          children: [
            {
              label: "Revenue",
              path: "/dashboard/admin/reports/revenue",
            },
            {
              label: "Passenger",
              path: "/dashboard/admin/reports/passenger",
            },
            {
              label: "Train Performance",
              path: "/dashboard/admin/reports/train",
            },
          ],
        },

        {
          label: "Settings",
          icon: "Settings",
          path: "/dashboard/admin/settings",
        },
      );
      break;

    case USER_ROLE.STAFF:
      sidebarItems.push(
        {
          label: "Dashboard",
          icon: "LayoutDashboard",
          path: "/dashboard/staff/info",
        },
        ...format,
        {
          label: "Settings",
          icon: "Settings",
          path: "/dashboard/staff/settings",
        },
      );
    default:
      break;
  }

  return sidebarItems;
};

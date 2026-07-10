export interface ISidebarItem {
  label: string;
  path?: string;
  children?: ISidebarItem[];
  icon?: React.ReactNode | string;
}
export const adminSidebarItems = [
  {
    label: "Dashboard",
    icon: "LayoutDashboard",
    path: "/dashboard/admin",
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
        label: "Create Train",
        path: "/dashboard/admin/trains/create",
      },
      {
        label: "Train Schedule",
        path: "/dashboard/admin/trains/schedule",
      },
      {
        label: "Train Assignment",
        path: "/dashboard/admin/trains/assignment",
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
    ],
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
      {
        label: "Platforms",
        path: "/dashboard/admin/platforms",
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
      {
        label: "Route Map",
        path: "/dashboard/admin/routes/map",
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

  // Fare
  {
    label: "Fare Management",
    icon: "BadgeDollarSign",
    children: [
      {
        label: "Fare List",
        path: "/dashboard/admin/fares",
      },
      {
        label: "Create Fare",
        path: "/dashboard/admin/fares/create",
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
];

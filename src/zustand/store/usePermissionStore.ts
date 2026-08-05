import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IStaffPermission } from "@/interface/staff-type";

interface PermissionState {
  permissions: IStaffPermission[];
  isLoaded: boolean;
  setPermissions: (permissions: IStaffPermission[]) => void;
  clearPermissions: () => void;
  setLoaded: (loaded: boolean) => void;
  hasAnyPermission: (pathname: string) => boolean;
}

export const usePermissionStore = create<PermissionState>()(
  persist(
    (set, get) => ({
      permissions: [],
      isLoaded: false,

      setPermissions: (permissions) =>
        set({
          permissions,
          isLoaded: true,
        }),

      clearPermissions: () =>
        set({
          permissions: [],
          isLoaded: false,
        }),

      setLoaded: (loaded) => set({ isLoaded: loaded }),

      hasAnyPermission: (pathname) => {
        const { permissions } = get();

        return permissions.some((p) => {
          const path = `/dashboard/staff/${p.permission.permission
            ?.toLowerCase()
            .replace(/_/g, "-")}`;

          return pathname === path || pathname.startsWith(`${path}/`);
        });
      },
    }),
    {
      name: "staff-permissions-storage",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);

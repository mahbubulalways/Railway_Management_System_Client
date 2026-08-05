"use client";

import { useEffect } from "react";
import { JwtTokenPayload } from "@/interface/token";
import { useGetStaffSidebarOptionsQuery } from "@/redux/features/user.features";
import { usePermissionStore } from "@/zustand/store/usePermissionStore";

const PermissionInitializer = ({ user }: { user: JwtTokenPayload | null }) => {
  const isStaff = user?.role === "STAFF";

  const setPermissions = usePermissionStore((s) => s.setPermissions);
  const setLoaded = usePermissionStore((s) => s.setLoaded);

  useEffect(() => {
    const hydrate = async () => {
      await usePermissionStore.persist.rehydrate();
      setLoaded(true);
    };

    hydrate();
  }, [setLoaded]);

  const { data, isSuccess } = useGetStaffSidebarOptionsQuery(undefined, {
    skip: !isStaff,
  });

  useEffect(() => {
    if (isSuccess && data?.data) {
      setPermissions(data.data);
    }
  }, [isSuccess, data, setPermissions]);

  return null;
};

export default PermissionInitializer;

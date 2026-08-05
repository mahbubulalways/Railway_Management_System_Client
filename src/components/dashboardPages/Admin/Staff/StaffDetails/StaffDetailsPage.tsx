"use client";

import { useGetSingleStaffQuery } from "@/redux/features/staff.features";
import { TStaffResponse } from "@/interface/staff";
import CustomLoader from "@/components/reusable/CustomLoader";
import CustomStatus from "@/components/reusable/CustomStatus";
import StaffHeader from "./StaffHeader";
import StaffStats from "./StaffStats";
import PersonalInformation from "./PersonalInformation";
import EmploymentInformation from "./EmploymentInformation";
import StaffPermissions from "./StaffPermissions";
import { usePermissionStore } from "@/zustand/store/usePermissionStore";
import { getUserInformation } from "@/service/auth.services";
const StaffDetailsPage = ({ id }: { id: string }) => {
  const { permissions } = usePermissionStore();
  const { data, isError, isLoading } = useGetSingleStaffQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const staff = data?.data as TStaffResponse;
  if (isLoading) {
    return <CustomLoader />;
  }

  if (isError) {
    return <CustomStatus type="error" />;
  }

  if (!staff) {
    return <CustomStatus type="empty" />;
  }

  const permitted = permissions?.find(
    (p) => p.permission.permission === "MANAGE_STAFF",
  );

  const isAdmin = getUserInformation().role === "ADMIN";
  const condition = isAdmin ? true : permitted ? true : false;
  return (
    <div className="flex flex-col gap-10">
      <StaffHeader staff={staff} />
      <StaffStats staff={staff} />
      <PersonalInformation staff={staff} />
      <EmploymentInformation staff={staff} condition={condition} />
      <StaffPermissions staff={staff} />
    </div>
  );
};

export default StaffDetailsPage;

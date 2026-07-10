"use client";

import { useGetSingleStaffTypeQuery } from "@/redux/features/staff.features";
import CustomModal from "../reusable/CustomModal";
import { TCustomModalProps } from "@/interface/modal";
import { IStaffType } from "@/interface/staff-type";
import CustomLoader from "../reusable/CustomLoader";
import CustomStatus from "../reusable/CustomStatus";

type TShowStaffPermission = {
  staffId: string;
} & TCustomModalProps;

const ShowStaffPermissionModal = ({
  isOpen,
  onClose,
  staffId,
}: TShowStaffPermission) => {
  const { data, isLoading, isError } = useGetSingleStaffTypeQuery(staffId, {
    refetchOnMountOrArgChange: true,
  });

  const staffType = data?.data as IStaffType;
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title={`${staffType?.type ?? "___"}'s permissions`}
    >
      <div>
        {isLoading ? (
          <>
            <CustomLoader fullscreen={false} size={40} />
          </>
        ) : isError ? (
          <>
            <CustomStatus
              fullScreen={false}
              type="error"
              description="Something went wrong"
              title="Error"
            />
          </>
        ) : (
          <>
            {staffType?.staffPermissions?.map((sp, idx) => (
              <div key={sp?.permission?.id}>
                <h1 className="flex items-center gap-2 font-medium">
                  <span> {idx + 1}.</span>
                  <span>
                    {sp?.permission?.permission
                      ?.toLocaleLowerCase()
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase())}
                  </span>
                </h1>
              </div>
            ))}
          </>
        )}
      </div>
    </CustomModal>
  );
};

export default ShowStaffPermissionModal;

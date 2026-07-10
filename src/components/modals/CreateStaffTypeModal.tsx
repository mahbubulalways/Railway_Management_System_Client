"use client";
import CustomInput from "../reusable/CustomInput";
import CustomModal from "../reusable/CustomModal";
import { TCustomModalProps } from "@/interface/modal";
import { FieldError, FieldValues, useForm } from "react-hook-form";
import Button from "../reusable/Button";
import {
  useCreatePermisisonMutation,
  useGetAllPermissionForStaffTypeQuery,
} from "@/redux/features/permission.feature";
import { useState } from "react";
import { useAlert } from "../Alert/useAlert";
import CustomTagInput from "../reusable/CustomTagInput";
import formatLabelValuePair from "@/utils/formatLabelValuePair";
import { useCreateStaffTypeMutation } from "@/redux/features/staff.features";
type TStaffType = {
  data: { type: string; permissions: string[] };
};
const CreateStaffTypeModal = ({ isOpen, onClose }: TCustomModalProps) => {
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TStaffType>();

  const {
    data,
    isError,
    isLoading: permissionLoading,
  } = useGetAllPermissionForStaffTypeQuery(undefined);
  const [createStaffTypeAsync, { isLoading }] = useCreateStaffTypeMutation();

  const convertPermissionLabelValue = formatLabelValuePair({
    data: data?.data,
    label: "permission",
    value: "id",
  });

  const [errorMsg, setErroMsg] = useState<string>("");
  const { showAlert } = useAlert();
  const onSubmit = async (data: FieldValues) => {
    setErroMsg("");
    console.log(data);
    try {
      const result = await createStaffTypeAsync(data).unwrap();
      if (result?.success) {
        handleClose();
        return showAlert({
          title: "Success",
          type: "success",
          description: result?.message,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErroMsg(error.data.message || "Something went wrong.");
    }
  };

  const handleClose = () => {
    reset();
    setErroMsg("");
    onClose();
  };
  return (
    <CustomModal isOpen={isOpen} onClose={handleClose} title="New Staff Types">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {errorMsg && (
          <p className="text-center text-sm text-red-500 mb-4">{errorMsg}</p>
        )}
        <CustomInput
          name="data.type"
          register={register}
          type="text"
          error={errors.data?.type}
          label="Type"
          placeholder="Enter type"
          rules={{ required: "Type is required." }}
        />
        <CustomTagInput
          name="data.permissions"
          label="Permissions"
          isLoading={permissionLoading}
          isError={isError}
          placeholder="Search permission..."
          suggestions={convertPermissionLabelValue}
          control={control}
          rules={{ required: "Permission is required" }}
          error={errors.data?.permissions as FieldError}
        />
        <Button isLoading={isLoading} type="submit" className="w-full">
          Create
        </Button>
      </form>
    </CustomModal>
  );
};

export default CreateStaffTypeModal;

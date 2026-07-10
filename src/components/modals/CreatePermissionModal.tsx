"use client";
import CustomInput from "../reusable/CustomInput";
import CustomModal from "../reusable/CustomModal";
import { TCustomModalProps } from "@/interface/modal";
import { FieldValues, useForm } from "react-hook-form";
import Button from "../reusable/Button";
import { useCreatePermisisonMutation } from "@/redux/features/permission.feature";
import { useState } from "react";
import { useAlert } from "../Alert/useAlert";
type TPermission = {
  data: { permission: string };
};
const CreatePermissionModal = ({ isOpen, onClose }: TCustomModalProps) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TPermission>();
  const [createPermissionAsync, { isLoading }] = useCreatePermisisonMutation();
  const [errorMsg, setErroMsg] = useState<string>("");
  const { showAlert } = useAlert();
  const onSubmit = async (data: FieldValues) => {
    setErroMsg("");
    try {
      const result = await createPermissionAsync(data).unwrap();
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
    <CustomModal isOpen={isOpen} onClose={handleClose} title="New permission">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {errorMsg && (
          <p className="text-center text-sm text-red-500 mb-4">{errorMsg}</p>
        )}
        <CustomInput
          name="data.permission"
          register={register}
          type="text"
          error={errors.data?.permission}
          label="Permission"
          placeholder="Enter permission"
          rules={{ required: "Permission is required." }}
        />
        <Button isLoading={isLoading} type="submit" className="w-full">
          Create
        </Button>
      </form>
    </CustomModal>
  );
};

export default CreatePermissionModal;

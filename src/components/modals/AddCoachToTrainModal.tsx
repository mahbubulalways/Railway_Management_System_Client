"use client";
import CustomModal from "../reusable/CustomModal";
import { TCustomModalProps } from "@/interface/modal";
import { FieldError, FieldValues, useForm } from "react-hook-form";
import Button from "../reusable/Button";
import { useState } from "react";
import { useAlert } from "../Alert/useAlert";
import CustomTagInput from "../reusable/CustomTagInput";
import formatLabelValuePair from "@/utils/formatLabelValuePair";
import { useGetCoachOptionsQuery } from "@/redux/features/coach.features";
import { useAddCoachsToTrainMutation } from "@/redux/features/train.features";
type TStaffType = {
  data: { trainId: string; coachId: string[] };
};

type TAddCoachModal = {
  trainId: string;
} & TCustomModalProps;
const AddCoachToTrainModal = ({ isOpen, onClose, trainId }: TAddCoachModal) => {
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TStaffType>();

  const {
    data,
    isError,
    isLoading: permissionLoading,
  } = useGetCoachOptionsQuery(undefined, { refetchOnMountOrArgChange: true });

  const [addCoachAsync, { isLoading }] = useAddCoachsToTrainMutation();

  const convertCoachLabelValue = formatLabelValuePair({
    data: data?.data,
    label: "coachCode",
    value: "id",
    extra: "coachNumber",
  });

  const [errorMsg, setErroMsg] = useState<string>("");
  const { showAlert } = useAlert();
  const onSubmit = async (data: FieldValues) => {
    setErroMsg("");
    data.data.trainId = trainId;
    try {
      const result = await addCoachAsync(data).unwrap();
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
    <CustomModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add Coach"
      width="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {errorMsg && (
          <p className="text-center text-sm text-red-500 mb-4">{errorMsg}</p>
        )}

        <CustomTagInput
          name="data.coachId"
          label="Coach"
          isLoading={permissionLoading}
          isError={isError}
          placeholder="Search coach..."
          suggestions={convertCoachLabelValue}
          control={control}
          rules={{ required: "Coach is required" }}
          error={errors.data?.coachId as FieldError}
        />
        <Button isLoading={isLoading} type="submit" className="w-full">
          Create
        </Button>
      </form>
    </CustomModal>
  );
};

export default AddCoachToTrainModal;

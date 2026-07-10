"use client";
import CustomInput from "../reusable/CustomInput";
import CustomModal from "../reusable/CustomModal";
import { TCustomModalProps } from "@/interface/modal";
import { FieldValues, useForm } from "react-hook-form";
import Button from "../reusable/Button";
import { useState } from "react";
import { useAlert } from "../Alert/useAlert";
import { useGetCoachModelOptionsQuery } from "@/redux/features/coach-model.feature";
import CustomSelect from "../reusable/CustomSelect";
import formatLabelValuePair from "@/utils/formatLabelValuePair";
import { useCreateCoachMutation } from "@/redux/features/coach.features";
type TCoach = {
  data: { coachNumber: string; coachModelId: string };
};
const CreateCoachModal = ({ isOpen, onClose }: TCustomModalProps) => {
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TCoach>();
  const [createCoachAsync, { isLoading }] = useCreateCoachMutation();
  const [errorMsg, setErroMsg] = useState<string>("");
  const { showAlert } = useAlert();

  const {
    isError,
    isLoading: coachLoading,
    data,
  } = useGetCoachModelOptionsQuery(undefined);
  console.log(data);
  const onSubmit = async (data: FieldValues) => {
    setErroMsg("");
    try {
      const result = await createCoachAsync(data).unwrap();
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

  const coachOptions = formatLabelValuePair({
    data: data?.data,
    label: "name",
    value: "id",
  });

  return (
    <CustomModal isOpen={isOpen} onClose={handleClose} title="New coach">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {errorMsg && (
          <p className="text-center text-sm text-red-500 mb-4">{errorMsg}</p>
        )}
        <CustomInput
          name="data.coachNumber"
          register={register}
          type="text"
          error={errors.data?.coachNumber}
          label="Coach name"
          placeholder="Enter Coach name"
          rules={{ required: "Coach name is required." }}
        />
        <CustomSelect
          control={control}
          name="data.coachModelId"
          options={coachOptions}
          isError={isError}
          isLoading={coachLoading}
          label="Coach type"
          placeholder="Enter a coach type"
        />
        <Button isLoading={isLoading} type="submit" className="w-full">
          Create
        </Button>
      </form>
    </CustomModal>
  );
};

export default CreateCoachModal;

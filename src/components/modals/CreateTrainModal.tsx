"use client";
import CustomInput from "../reusable/CustomInput";
import CustomModal from "../reusable/CustomModal";
import { TCustomModalProps } from "@/interface/modal";
import { FieldValues, useForm } from "react-hook-form";
import Button from "../reusable/Button";
import { useState } from "react";
import { useAlert } from "../Alert/useAlert";
import { ICreateTrain } from "@/interface/train";
import CustomSelect from "../reusable/CustomSelect";
import CustomTextArea from "../reusable/CustomTextArea";
import { useCreateTrainMutation } from "@/redux/features/train.features";
export const TRAIN_TYPES = [
  {
    label: "Intercity",
    value: "INTERCITY",
  },
  {
    label: "Mail",
    value: "MAIL",
  },
  {
    label: "Express",
    value: "EXPRESS",
  },
  {
    label: "Local",
    value: "LOCAL",
  },
  {
    label: "Commuter",
    value: "COMMUTER",
  },
  {
    label: "Special",
    value: "SPECIAL",
  },
  {
    label: "Goods",
    value: "GOODS",
  },
];
const CreateTrainModal = ({ isOpen, onClose }: TCustomModalProps) => {
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateTrain>();
  const [createTrainAsync, { isLoading }] = useCreateTrainMutation();
  const [errorMsg, setErroMsg] = useState<string>("");
  const { showAlert } = useAlert();
  const onSubmit = async (data: FieldValues) => {
    setErroMsg("");
    data.data.maxSpeed = Number(data.data.maxSpeed);
    data.data.manufactureYear = Number(data.data.manufactureYear);
    try {
      const result = await createTrainAsync(data).unwrap();
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
      title="New Train"
      width="xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {errorMsg && (
          <p className="text-center text-sm text-red-500 mb-4">{errorMsg}</p>
        )}
        <CustomInput
          name="data.name"
          register={register}
          type="text"
          error={errors.data?.name}
          label="Name"
          placeholder="Enter name"
          rules={{ required: "Name is required." }}
        />
        <div className="grid grid-cols-2 gap-3">
          <CustomSelect
            control={control}
            name="data.type"
            options={TRAIN_TYPES}
            error={errors.data?.type}
            label="Train type"
            rules={{ required: "Train type is required" }}
            placeholder="Train type"
          />
          <CustomSelect
            control={control}
            name="data.status"
            options={[
              { label: "Active", value: "ACTIVE" },
              { label: "Inactive", value: "INACTIVE" },
            ]}
            error={errors.data?.status}
            label="Train status"
            rules={{ required: "Train status is required" }}
            placeholder="Train status"
          />
          <CustomInput
            name="data.maxSpeed"
            register={register}
            type="number"
            error={errors.data?.maxSpeed}
            label="Max speed"
            placeholder="Enter max speed"
            rules={{ required: "Max speed is required." }}
          />
          <CustomInput
            name="data.manufactureYear"
            register={register}
            type="number"
            error={errors.data?.manufactureYear}
            label="manufactureYear"
            placeholder="Enter manufacture year"
            rules={{ required: "Manufacture year is required." }}
          />
        </div>
        <CustomTextArea
          control={control}
          name="data.notes"
          label="Notes"
          placeholder="Write notes..."
          rows={2}
          maxLength={150}
        />
        <Button isLoading={isLoading} type="submit" className="w-full">
          Create
        </Button>
      </form>
    </CustomModal>
  );
};

export default CreateTrainModal;

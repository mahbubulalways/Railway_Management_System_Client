"use client";
import CustomInput from "../reusable/CustomInput";
import CustomModal from "../reusable/CustomModal";
import { TCustomModalProps } from "@/interface/modal";
import { FieldError, FieldValues, useForm } from "react-hook-form";
import Button from "../reusable/Button";
import { useState } from "react";
import { useAlert } from "../Alert/useAlert";
import CustomSelect from "../reusable/CustomSelect";
import {
  useCreateScheduleMutation,
  useGetTrainRouteOptionsQuery,
} from "@/redux/features/schedule.features";
import formatLabelValuePair from "@/utils/formatLabelValuePair";
import CustomDatePicker from "../reusable/CustomDatepicker";
import {
  RUNNING_DAYS,
  TIME_OPTIONS,
  TRAIN_DERECTIONS,
} from "@/utils/schedule.utils.";
import { ICreateSchedule } from "@/interface/schedule";
import CustomTagInput from "../reusable/CustomTagInput";

const CreateTrainScheduleModal = ({ isOpen, onClose }: TCustomModalProps) => {
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateSchedule>();
  const {
    isError,
    isLoading: optionsLoading,
    data,
  } = useGetTrainRouteOptionsQuery(undefined);

  // FORMAT OPTIONS
  const trainOptions = formatLabelValuePair({
    data: data?.data?.trains,
    label: "name",
    value: "trainId",
  });

  const routeOptions = formatLabelValuePair({
    data: data?.data?.routes,
    label: "name",
    value: "id",
  });

  const [createTrainAsync, { isLoading }] = useCreateScheduleMutation();
  const [errorMsg, setErroMsg] = useState<string>("");
  const { showAlert } = useAlert();
  const onSubmit = async (data: FieldValues) => {
    // data.data.validFrom = new Date(data.data.validFrom);
    // data.data.validUntil = new Date(data.data.validUntil);
    setErroMsg("");
    console.log(data);
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
      title="New Schedule"
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

        <CustomTagInput
          control={control}
          name="data.runningDays"
          suggestions={RUNNING_DAYS}
          label="Running days"
          placeholder="Enter running days"
          rules={{ required: "Days of week." }}
          error={errors.data?.runningDays as FieldError}
        />
        <div className="grid grid-cols-2 gap-3">
          <CustomSelect
            control={control}
            name="data.trainId"
            options={trainOptions}
            error={errors.data?.trainId}
            label="Train name"
            rules={{ required: "Train name is required" }}
            placeholder="Train name"
            isError={isError}
            isLoading={optionsLoading}
            searchable
          />
          <CustomSelect
            control={control}
            name="data.routeId"
            options={routeOptions}
            searchable
            error={errors.data?.routeId}
            label="Route name"
            rules={{ required: "Route name is required" }}
            placeholder="Route name"
            isError={isError}
            isLoading={optionsLoading}
          />

          <CustomSelect
            control={control}
            name="data.direction"
            options={TRAIN_DERECTIONS}
            error={errors.data?.direction}
            label="Direction"
            rules={{ required: "Direction is required" }}
            placeholder="Direction"
          />

          <CustomSelect
            control={control}
            name="data.startTime"
            options={TIME_OPTIONS}
            error={errors.data?.startTime}
            label="Start time"
            rules={{ required: "Start time is required" }}
            placeholder="Start time"
            searchable
          />
          <CustomDatePicker
            control={control}
            name="data.validFrom"
            placeholder="Enter start date"
            rules={{ required: "Start date is required." }}
            label="Start date"
            error={errors.data?.validFrom}
          />
          <CustomDatePicker
            control={control}
            name="data.validUntil"
            label="End date "
            placeholder="End date speed"
            rules={{ required: "End date is required." }}
            error={errors.data?.validUntil}
          />
        </div>

        <Button isLoading={isLoading} type="submit" className="w-full">
          Create
        </Button>
      </form>
    </CustomModal>
  );
};

export default CreateTrainScheduleModal;

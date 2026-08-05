"use client";
import CustomInput from "../reusable/CustomInput";
import CustomModal from "../reusable/CustomModal";
import { TCustomModalProps } from "@/interface/modal";
import { FieldValues, useForm } from "react-hook-form";
import Button from "../reusable/Button";
import { useState } from "react";
import { useAlert } from "../Alert/useAlert";
import formatLabelValuePair from "@/utils/formatLabelValuePair";
import { useGetStaffTypeOptionQuery } from "@/redux/features/staff.features";
import CustomSelect from "../reusable/CustomSelect";
import { SHIFT_TYPE_OPTIONS, TCreateeStaff } from "@/interface/staff";
import CustomTimePicker from "../reusable/CustomTimePicker";
import CustomDatePicker from "../reusable/CustomDatepicker";
import { useGetStationOptinsQuery } from "@/redux/features/station.features";
import { useCreateStaffAccountMutation } from "@/redux/features/user.features";

const CreateStaffModal = ({ isOpen, onClose }: TCustomModalProps) => {
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TCreateeStaff>();

  const {
    data,
    isError,
    isLoading: stationLoading,
  } = useGetStationOptinsQuery(undefined);

  const {
    data: staffTypeOptions,
    isLoading: staffLoading,
    isError: staffTypeError,
  } = useGetStaffTypeOptionQuery(undefined);
  const [createStaffAsync, { isLoading }] = useCreateStaffAccountMutation();

  const convertStationLabelValue = formatLabelValuePair({
    data: data?.data,
    label: "name",
    value: "stationId",
  });

  const convertStaffTypeLabelValue = formatLabelValuePair({
    data: staffTypeOptions?.data,
    label: "type",
    value: "id",
  });

  const [errorMsg, setErroMsg] = useState<string>("");
  const { showAlert } = useAlert();
  const onSubmit = async (data: FieldValues) => {
    setErroMsg("");
    data.data.data.salary = Number(data.data.data.salary);
    try {
      const result = await createStaffAsync(data).unwrap();
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
      console.log(error);
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
      title="Create Staff Account"
      width="full"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {errorMsg && (
          <p className="text-center text-sm text-red-500 mb-4">{errorMsg}</p>
        )}
        <div className="grid grid-cols-2 gap-2">
          <CustomInput
            name="data.data.name"
            register={register}
            type="text"
            error={errors.data?.data?.name}
            label="Name"
            placeholder="Enter Name"
            rules={{ required: "Name is required." }}
          />

          <CustomInput
            name="data.data.email"
            register={register}
            type="email"
            error={errors.data?.data?.email}
            label="Email"
            placeholder="Enter email"
            rules={{ required: "Address is required." }}
          />

          <CustomInput
            name="data.data.phone"
            register={register}
            type="number"
            error={errors.data?.data?.phone}
            label="Phone"
            placeholder="Enter phone number"
            rules={{ required: "Phone number is required." }}
          />

          <CustomSelect
            control={control}
            name="data.data.staffTypeId"
            options={convertStaffTypeLabelValue}
            isLoading={staffLoading}
            isError={staffTypeError}
            searchable
            error={errors.data?.data?.staffTypeId}
            label="Staff Type"
            placeholder="Enter staff type"
            rules={{ required: "Staff type is required." }}
          />

          <CustomSelect
            control={control}
            name="data.data.stationId"
            options={convertStationLabelValue}
            error={errors.data?.data?.stationId}
            label="Station"
            rules={{ required: "Station is required" }}
            placeholder="Enter station"
            isLoading={stationLoading}
            isError={isError}
            searchable
          />
          <CustomSelect
            control={control}
            name="data.data.shift"
            options={SHIFT_TYPE_OPTIONS}
            error={errors.data?.data?.shift}
            label="Working shift"
            rules={{ required: "Shift type is required" }}
            placeholder="Enter shift"
          />
          <CustomInput
            name="data.data.salary"
            register={register}
            type="number"
            error={errors.data?.data?.salary}
            label="Salary"
            placeholder="Enter salary"
            rules={{ required: "Salary is required." }}
          />
          <CustomDatePicker
            control={control}
            name="data.data.joiningDate"
            error={errors.data?.data?.joiningDate}
            placeholder="Enter joining date"
            label="Joining date"
            rules={{ required: "Joining date is required." }}
          />
          <CustomTimePicker
            name="data.data.dutyStartTime"
            register={register}
            error={errors.data?.data?.dutyStartTime}
            label="Duty start"
            placeholder="Enter duty start time"
            rules={{ required: "Start time is required" }}
          />

          <CustomTimePicker
            name="data.data.dutyEndTime"
            register={register}
            error={errors.data?.data?.dutyEndTime}
            label="Duty end"
            placeholder="Enter duty end time"
            rules={{ required: "End time is required" }}
          />

          <CustomInput
            name="data.data.address"
            register={register}
            type="text"
            error={errors.data?.data?.address}
            label="Address"
            placeholder="Enter address"
            rules={{ required: "Address is required." }}
          />

          <CustomInput
            name="data.password"
            register={register}
            type="text"
            error={errors.data?.password}
            label="Password"
            placeholder="Enter Password"
            rules={{ required: "Address is required." }}
          />
        </div>

        <Button isLoading={isLoading} type="submit" className="w-full">
          Create
        </Button>
      </form>
    </CustomModal>
  );
};

export default CreateStaffModal;

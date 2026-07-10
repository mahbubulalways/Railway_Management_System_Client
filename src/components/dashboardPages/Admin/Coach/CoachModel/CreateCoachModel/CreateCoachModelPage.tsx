"use client";

import { useAlert } from "@/components/Alert/useAlert";
import Button from "@/components/reusable/Button";
import CustomInput from "@/components/reusable/CustomInput";
import CustomSelect from "@/components/reusable/CustomSelect";
import { TCreateCoachModel } from "@/interface/coach-model";
import { useCreateCoachModelMutation } from "@/redux/features/coach-model.feature";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import CoachLayoutArray from "./CoachLayoutArray";

export const coachTypeOptions = [
  {
    label: "AC Chair",
    value: "AC_CHAIR",
  },
  {
    label: "Shovon Chair",
    value: "SHOVON_CHAIR",
  },
  {
    label: "AC Cabin",
    value: "AC_CABIN",
  },
  {
    label: "Cabin",
    value: "CABIN",
  },
  {
    label: "Sleeper",
    value: "SLEEPER",
  },
];

const CreateCoachModelPage = () => {
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TCreateCoachModel>();
  const [createCoachModelAsync, { isLoading }] = useCreateCoachModelMutation();
  const [enableButton, setEnableButton] = useState<boolean>(false);
  const { showAlert } = useAlert();

  const onSubmit = async (data: FieldValues) => {
    try {
      data.data.totalSeats = Number(data?.data?.totalSeats);
      const result = await createCoachModelAsync(data).unwrap();
      if (result?.success) {
        return showAlert({
          title: "Success",
          type: "success",
          description: result?.message,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      return showAlert({
        title: "Error",
        type: "error",
        description: error.data.message || "Something went wrong.",
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-3 gap-5">
          <CustomInput
            name="data.name"
            register={register}
            type="text"
            error={errors.data?.name}
            label="Coach name"
            placeholder="Enter Coach name"
            rules={{ required: "Coach name is required." }}
          />
          <CustomSelect
            control={control}
            name="data.type"
            options={coachTypeOptions}
            label="Coach type"
            error={errors.data?.type}
            placeholder="Enter a coach type"
            rules={{ required: "Coach type is required" }}
          />
          <CustomInput
            name="data.totalSeats"
            register={register}
            type="number"
            error={errors.data?.totalSeats}
            label="Coach name"
            placeholder="Enter seats"
            rules={{ required: "Seats is required." }}
          />
        </div>
        <CoachLayoutArray
          control={control}
          errors={errors}
          name="data.layout"
          setEnableButton={setEnableButton}
        />
        <Button
          isLoading={isLoading}
          disabled={enableButton}
          type="submit"
          className="w-full"
        >
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateCoachModelPage;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Button from "@/components/reusable/Button";
import CustomInput from "@/components/reusable/CustomInput";
import CustomSelect from "@/components/reusable/CustomSelect";
import { IPlatform, TCreateStation } from "@/interface/station";
import { Plus, Trash2 } from "lucide-react";
import { FieldErrors, UseFormRegister, useFieldArray } from "react-hook-form";

const PLATFORM_TYPE_OPTIONS = [
  { label: "Intercity", value: "Intercity" },
  { label: "Cargo", value: "Cargo" },
  { label: "Local", value: "Local" },
  { label: "Standard", value: "standard" },
];

const PLATFORM_STATUS_OPTIONS = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
  { label: "Under Maintenance", value: "Under Maintenance" },
];

const defaultPlatform: Partial<IPlatform> = {
  // name: "",
  // type: "",
  // status: "",
  // length: 0,
  // capacity: 0,
  // hasRoof: false,
};

type TPlatformsFieldArrayProps = {
  control: any;
  register: UseFormRegister<any>;
  errors?: FieldErrors<TCreateStation>;
  name?: string;
};

const PlatformsFieldArray = ({
  control,
  register,
  errors,
  name = "platforms",
}: TPlatformsFieldArrayProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div className="flex flex-col gap-4 mt-10">
      <div className="flex items-center justify-between pb-2">
        <h3 className="font-semibold text-gray-700 text-2xl">Platforms</h3>
        <Button type="button" onClick={() => append(defaultPlatform)}>
          <Plus size={18} />
          Add Platform
        </Button>
      </div>

      {fields.length === 0 && (
        <p className="text-sm text-gray-400">No platforms added yet.</p>
      )}

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex flex-col gap-5 rounded-lg border border-gray-200 bg-white p-5"
        >
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-500 text-lg">
              Platform {index + 1}
            </span>
            <button
              type="button"
              onClick={() => remove(index)}
              className="flex items-center gap-1 text-red-500 hover:text-red-600 cursor-pointer"
            >
              <Trash2 size={18} />
              Remove
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <CustomInput
              name={`${name}.${index}.name`}
              register={register}
              placeholder="Platform name"
              error={errors?.data?.platforms?.[index]?.name}
              label="Name"
              type="text"
              rules={{ required: "Platform name is requirted" }}
            />

            <CustomSelect
              control={control}
              name={`${name}.${index}.type`}
              placeholder="Platform type"
              error={errors?.data?.platforms?.[index]?.type}
              label="Platform type"
              rules={{ required: "Platform type is requirted" }}
              options={PLATFORM_TYPE_OPTIONS}
            />
            <CustomSelect
              control={control}
              name={`${name}.${index}.status`}
              placeholder="Platform status"
              error={errors?.data?.platforms?.[index]?.status}
              label="Platform status"
              rules={{ required: "Platform status is requirted" }}
              options={PLATFORM_STATUS_OPTIONS}
            />
            <CustomInput
              name={`${name}.${index}.length`}
              register={register}
              placeholder="Platform name"
              error={errors?.data?.platforms?.[index]?.length}
              label="Platform length"
              type="number"
              rules={{ required: "Platform length is requirted" }}
            />
            <CustomInput
              name={`${name}.${index}.capacity`}
              register={register}
              placeholder="Platform name"
              error={errors?.data?.platforms?.[index]?.capacity}
              label="Platform capacity"
              type="number"
              rules={{ required: "Platform capacity is requirted" }}
            />

            <CustomSelect
              control={control}
              name={`${name}.${index}.hasRoof`}
              placeholder="Platform type"
              error={errors?.data?.platforms?.[index]?.hasRoof}
              label="Platform roof"
              rules={{ required: "Platform roof is requirted" }}
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ]}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlatformsFieldArray;

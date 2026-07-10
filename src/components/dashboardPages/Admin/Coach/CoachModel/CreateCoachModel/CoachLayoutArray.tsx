/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Button from "@/components/reusable/Button";
import CustomSelect from "@/components/reusable/CustomSelect";
import { TCoachModelLayout, TCreateCoachModel } from "@/interface/coach-model";
import { Plus, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { FieldErrors, useFieldArray, useWatch } from "react-hook-form";

const coachSeatOptions = [
  { label: "0", value: 0 },
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
];

const defaultPlatform: Partial<TCoachModelLayout> = {
  // leftSeats: 0,
  // rightSeats: 0,
};

type TCoachLayoutArrayProps = {
  control: any;
  errors?: FieldErrors<TCreateCoachModel>;
  name?: string;
  setEnableButton: Dispatch<SetStateAction<boolean>>;
};

const CoachLayoutArray = ({
  control,
  errors,
  name = "layout",
  setEnableButton,
}: TCoachLayoutArrayProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  const formValues = useWatch({
    control,
    name: [name, "data.totalSeats"],
  });
  const sumOfSeats =
    formValues[0]?.reduce(
      (total: number, row: TCoachModelLayout) =>
        total + (Number(row?.leftSeats) || 0) + (Number(row?.rightSeats) || 0),
      0,
    ) || 0;

  // LOGIC

  const totalSeats = Number(formValues[1] || 0);

  const isMatched = sumOfSeats === totalSeats;
  const isExceeded = sumOfSeats > totalSeats;
  const remainingSeats = totalSeats - sumOfSeats;
  const canAddRow = sumOfSeats < totalSeats;

  useEffect(() => {
    append(defaultPlatform);
  }, [append]);

  useEffect(() => {
    setEnableButton(!isMatched);
  }, [isMatched, setEnableButton]);

  return (
    <div className="flex flex-col gap-4 mt-10">
      <div className="flex items-center justify-between pb-2">
        <h3 className="font-semibold text-gray-700 text-2xl">
          Row Configuration
        </h3>
        <Button
          disabled={!canAddRow}
          type="button"
          onClick={() => append(defaultPlatform)}
        >
          <Plus size={18} />
          Add Row
        </Button>
      </div>

      {fields.length === 0 && (
        <p className="text-sm text-gray-400"> No rows added yet.</p>
      )}

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex flex-col gap-5 rounded-lg border border-gray-200 bg-white p-5"
        >
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-500 text-lg">
              Row {index + 1}
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => remove(index)}
                className="flex items-center gap-1 text-red-500 hover:text-red-600 cursor-pointer"
              >
                <Trash2 size={18} />
                Remove
              </button>
              <button
                type="button"
                disabled={!canAddRow}
                onClick={() => append(defaultPlatform)}
                className="flex items-center gap-1 text-green-500 hover:text-green-600 cursor-pointer disabled:cursor-not-allowed
        disabled:text-gray-400"
              >
                <Plus size={18} />
                Add More
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <CustomSelect
              control={control}
              name={`${name}.${index}.leftSeats`}
              placeholder="Left seats"
              error={errors?.data?.layout?.[index]?.leftSeats}
              label="Left seats"
              rules={{ required: "Left seats is requirted" }}
              options={coachSeatOptions}
            />

            <CustomSelect
              control={control}
              name={`${name}.${index}.rightSeats`}
              placeholder="Right seats"
              error={errors?.data?.layout?.[index]?.rightSeats}
              label="Right seats"
              rules={{ required: "Right seats is requirted" }}
              options={coachSeatOptions}
            />
          </div>
        </div>
      ))}

      <div className="mt-6 flex justify-end">
        <div className="min-w-72 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h4 className="mb-4 text-lg font-semibold text-gray-800">
            Seat Summary
          </h4>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Total Seats</span>
              <span className="font-semibold">{totalSeats}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Configured Seats</span>
              <span
                className={`font-semibold ${
                  isMatched
                    ? "text-green-600"
                    : isExceeded
                      ? "text-red-600"
                      : "text-amber-600"
                }`}
              >
                {sumOfSeats}
              </span>
            </div>

            {!isMatched && (
              <div
                className={`mt-3 rounded-lg px-3 py-2 text-sm font-medium ${
                  isExceeded
                    ? "bg-red-50 text-red-600"
                    : "bg-yellow-50 text-yellow-700"
                }`}
              >
                {isExceeded
                  ? `Configured seats exceed the total by ${
                      sumOfSeats - totalSeats
                    } seat${sumOfSeats - totalSeats > 1 ? "s" : ""}.`
                  : `${remainingSeats} seat${
                      remainingSeats > 1 ? "s are" : " is"
                    } still not configured.`}
              </div>
            )}

            {totalSeats === 0 && sumOfSeats === 0 ? (
              <div className="mt-3 rounded-lg bg-gray-50 px-3 py-2 text-sm font-medium text-gray-600">
                No set configure yet
              </div>
            ) : isMatched ? (
              <div className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-600">
                ✓ Seat configuration is complete.
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachLayoutArray;

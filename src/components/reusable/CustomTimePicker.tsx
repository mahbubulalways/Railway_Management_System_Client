/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChevronDown, Clock3 } from "lucide-react";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

type TCustomTimePicker = {
  label?: string;
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  rules?: RegisterOptions;
};

const generateTimes = () => {
  const times: string[] = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const period = hour >= 12 ? "PM" : "AM";
      const hour12 = hour % 12 || 12;

      times.push(
        `${hour12.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")} ${period}`,
      );
    }
  }

  return times;
};

const times = generateTimes();

const CustomTimePicker = ({
  label,
  name,
  placeholder = "Select Time",
  register,
  error,
  rules,
}: TCustomTimePicker) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
          {rules?.required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {/* Left Icon */}
        <Clock3
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <select
          id={name}
          defaultValue=""
          {...register(name, rules)}
          className={`
            h-12 w-full appearance-none rounded-xl bg-white
            pl-10 pr-10 text-sm font-medium text-gray-700
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-[#006A4E]/20
            ${
              error
                ? "border-2 border-red-500"
                : "border border-gray-300 hover:border-[#006A4E] focus:border-[#006A4E]"
            }
          `}
        >
          <option value="" disabled>
            {placeholder}
          </option>

          {times.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>

        {/* Right Arrow */}
        <ChevronDown
          size={18}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>

      {error && <span className="text-xs text-red-600">{error.message}</span>}
    </div>
  );
};

export default CustomTimePicker;

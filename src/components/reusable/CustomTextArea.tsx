/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Controller, FieldError, RegisterOptions } from "react-hook-form";

type TCustomTextAreaProps = {
  label?: string;
  name: string;
  placeholder?: string;
  control: any;
  rules?: RegisterOptions;
  error?: FieldError;
  rows?: number;
  /** max character count dile counter dekhabe + limit enforce korbe */
  maxLength?: number;
  disabled?: boolean;
};

const CustomTextArea = ({
  label,
  name,
  placeholder,
  control,
  rules,
  error,
  rows = 4,
  maxLength,
  disabled,
}: TCustomTextAreaProps) => {
  const [focused, setFocused] = useState(false);
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue=""
      render={({ field }) => {
        const value: string = field.value || "";

        return (
          <div className="flex flex-col gap-2">
            {label && (
              <label className="font-medium text-gray-600">
                {label}
                {rules && <span className="text-red-500">*</span>}
              </label>
            )}

            <textarea
              {...field}
              value={value}
              rows={rows}
              disabled={disabled}
              placeholder={placeholder}
              maxLength={maxLength}
              onFocus={() => setFocused(true)}
              onBlur={() => {
                setFocused(false);
                field.onBlur();
              }}
              className={`w-full resize-y rounded-lg border px-3 py-2 outline-none transition-colors disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 ${
                error
                  ? "border-2 border-red-500"
                  : focused
                    ? "border-gray-300 ring-2 ring-[#00664A]"
                    : "border-gray-300"
              }`}
            />

            <div className="flex items-center justify-between">
              <div>
                {error && (
                  <p className="text-sm text-red-600">{error.message}</p>
                )}
              </div>

              {maxLength && (
                <p className="text-xs text-gray-400">
                  {value.length}/{maxLength}
                </p>
              )}
            </div>
          </div>
        );
      }}
    />
  );
};

export default CustomTextArea;

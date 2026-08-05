/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Calendar } from "lucide-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, FieldError, RegisterOptions } from "react-hook-form";

type TPickMode = "date" | "month" | "year";

type TCustomDatePicker = {
  name: string;
  control: any;
  label?: string;
  placeholder?: string;
  rules?: RegisterOptions;
  error?: FieldError;
  mode?: TPickMode;
  disablePastDates?: boolean;
  maxFutureDays?: number;
  minDate?: Date;
  maxDate?: Date;
  border?: boolean;
};

const CustomDatePicker = ({
  name,
  control,
  label,
  placeholder,
  rules,
  error,
  mode = "date",
  disablePastDates = false,
  maxFutureDays,
  minDate,
  maxDate,
  border = true,
}: TCustomDatePicker) => {
  const [focused, setFocused] = useState(false);

  const modeConfig: Record<
    TPickMode,
    { dateFormat: string; placeholder: string }
  > = {
    date: { dateFormat: "dd-MM-yyyy", placeholder: "Select a date" },
    month: { dateFormat: "MM-yyyy", placeholder: "Select a month" },
    year: { dateFormat: "yyyy", placeholder: "Select a year" },
  };

  // today er start (time 00:00:00) - past date compare korar jonno
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const resolvedMinDate = disablePastDates ? today : minDate;

  const resolvedMaxDate =
    maxFutureDays !== undefined
      ? new Date(today.getTime() + maxFutureDays * 24 * 60 * 60 * 1000)
      : maxDate;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="block font-medium text-gray-700">
          {label}
          {rules && <span className="text-red-500">*</span>}
        </label>
      )}

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <div className="custom-date-picker-wrapper relative w-full">
            <div
              className={`min-h-12  relative flex w-full items-center rounded-lg ${border ? "border px-4 py-2 outline-none" : ""} transition-colors ${
                error
                  ? "border-2 border-red-500"
                  : `${border ? "border-gray-300 focus-within:ring-2 focus-within:ring-[#00664A]" : ""}`
              }`}
            >
              <DatePicker
                placeholderText={placeholder || modeConfig[mode].placeholder}
                selected={field.value}
                onChange={(date: Date | null) => field.onChange(date)}
                onCalendarOpen={() => setFocused(true)}
                onCalendarClose={() => {
                  setFocused(false);
                  field.onBlur();
                }}
                minDate={resolvedMinDate}
                maxDate={resolvedMaxDate}
                dateFormat={modeConfig[mode].dateFormat}
                showYearPicker={mode === "year"}
                showMonthYearPicker={mode === "month"}
                className="w-full cursor-pointer bg-transparent pr-6 text-sm text-black outline-none placeholder:text-[16px] placeholder:text-black/50"
                calendarClassName="custom-datepicker-calendar"
                popperPlacement="bottom-start"
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
              />
              {/* Calendar Icon Right Side */}
              {border ? (
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Calendar size={18} />
                </div>
              ) : (
                ""
              )}
            </div>

            {/* scoped global styles for the react-datepicker popup */}
            <style jsx global>{`
              .custom-date-picker-wrapper .react-datepicker-popper {
                z-index: 50;
              }

              .custom-date-picker-wrapper .react-datepicker {
                font-family: inherit;
                border: 1px solid #e5e7eb;
                border-radius: 1rem;
                box-shadow:
                  0 20px 25px -5px rgb(0 0 0 / 0.1),
                  0 8px 10px -6px rgb(0 0 0 / 0.1);
                overflow: hidden;
                width: 340px;
              }

              ..custom-date-picker-wrapper .react-datepicker__triangle {
                display: none;
              }

              /* make header/content span full width of the card */
              .custom-date-picker-wrapper .react-datepicker__month-container {
                display: block;
                float: none;
                width: 100%;
              }

              .custom-date-picker-wrapper .react-datepicker__header {
                background-color: #00664a;
                border-bottom: none;
                border-radius: 0;
                width: 100%;
                box-sizing: border-box;
                padding-top: 1.1rem;
                padding-bottom: 0.85rem;
              }

              .custom-date-picker-wrapper .react-datepicker__current-month,
              .custom-date-picker-wrapper .react-datepicker-time__header,
              .custom-date-picker-wrapper .react-datepicker-year-header {
                color: #fff;
                font-weight: 600;
                font-size: 1rem;
              }

              .custom-date-picker-wrapper .react-datepicker__navigation {
                top: 1.1rem;
                width: 28px;
                height: 28px;
              }

              .custom-date-picker-wrapper
                .react-datepicker__navigation--previous {
                left: 14px;
              }

              .custom-date-picker-wrapper .react-datepicker__navigation--next {
                right: 14px;
              }

              .custom-date-picker-wrapper
                .react-datepicker__navigation-icon::before {
                border-color: #fff;
                border-width: 2px 2px 0 0;
                width: 8px;
                height: 8px;
              }

              .custom-date-picker-wrapper
                .react-datepicker__navigation:hover
                *::before {
                border-color: rgba(255, 255, 255, 0.7);
              }

              /* day names row */
              .custom-date-picker-wrapper .react-datepicker__day-names {
                display: flex;
                justify-content: space-around;
                padding: 0.5rem 0.5rem 0;
              }

              .custom-date-picker-wrapper .react-datepicker__day-name {
                color: rgba(255, 255, 255, 0.85);
                font-size: 0.75rem;
                font-weight: 500;
                width: 2.4rem;
                margin: 0.15rem;
              }

              /* month grid */
              .custom-date-picker-wrapper .react-datepicker__month {
                margin: 0.6rem;
              }

              .custom-date-picker-wrapper .react-datepicker__week {
                display: flex;
                justify-content: space-around;
              }

              .custom-date-picker-wrapper .react-datepicker__day,
              .custom-date-picker-wrapper .react-datepicker__month-text,
              .custom-date-picker-wrapper .react-datepicker__year-text {
                width: 2.4rem;
                height: 2.4rem;
                line-height: 2.4rem;
                margin: 0.15rem;
                border-radius: 9999px;
                font-size: 0.9rem;
                color: #374151;
                transition: background-color 0.15s ease;
              }

              .custom-date-picker-wrapper .react-datepicker__month-text,
              .custom-date-picker-wrapper .react-datepicker__year-text {
                width: auto;
                height: auto;
                line-height: normal;
                padding: 0.6rem 0.5rem;
                border-radius: 0.6rem;
              }

              .custom-date-picker-wrapper .react-datepicker__day:hover,
              .custom-date-picker-wrapper .react-datepicker__month-text:hover,
              .custom-date-picker-wrapper .react-datepicker__year-text:hover {
                background-color: rgba(0, 102, 74, 0.1);
              }

              .custom-date-picker-wrapper .react-datepicker__day--selected,
              .custom-date-picker-wrapper
                .react-datepicker__day--keyboard-selected,
              .custom-date-picker-wrapper
                .react-datepicker__month-text--selected,
              .custom-date-picker-wrapper
                .react-datepicker__year-text--selected {
                background-color: #00664a !important;
                color: #fff !important;
                font-weight: 600;
              }

              .custom-date-picker-wrapper .react-datepicker__day--today {
                font-weight: 700;
                border: 1.5px solid #00664a;
              }

              .custom-date-picker-wrapper
                .react-datepicker__day--outside-month {
                color: #cbd5e1;
              }

              .custom-date-picker-wrapper .react-datepicker__day--disabled {
                color: #e5e7eb;
                cursor: not-allowed;
              }

              .custom-date-picker-wrapper .react-datepicker__year-wrapper {
                max-width: 280px;
                justify-content: center;
                padding: 0.5rem;
              }

              .custom-date-picker-wrapper .react-datepicker__month-wrapper {
                display: flex;
              }
            `}</style>
          </div>
        )}
      />
      {error && <p className="text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default CustomDatePicker;

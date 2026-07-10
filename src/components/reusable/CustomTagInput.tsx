/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChevronDown, X } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Controller, FieldError, RegisterOptions } from "react-hook-form";
import { FaSpinner } from "react-icons/fa6";

export type TTagOption = {
  label: string;
  value: string;
};

type TCustomTagInputProps = {
  label?: string;
  name: string;
  placeholder?: string;
  suggestions: TTagOption[];
  control: any;
  rules?: RegisterOptions;
  error?: FieldError;
  isLoading?: boolean;
  isError?: boolean;
};

const CustomTagInput = ({
  label,
  name,
  placeholder,
  suggestions,
  control,
  rules,
  error,
  isLoading,
  isError,
}: TCustomTagInputProps) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      const clickedInsideBox = wrapperRef.current?.contains(target);
      const clickedInsideDropdown = document
        .getElementById(`tag-dropdown-${name}`)
        ?.contains(target);

      if (!clickedInsideBox && !clickedInsideDropdown) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [name]);

  // calculate position of the input box (for the portal dropdown)
  const updatePosition = () => {
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 4, // small gap, like mt-2
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  };

  useLayoutEffect(() => {
    if (open) updatePosition();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    // keep dropdown attached to the input on scroll/resize (e.g. modal scroll)
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={[]}
      render={({ field }) => {
        // field.value is now a plain array of values, e.g. ["v1", "v2"]
        const selectedValues: string[] = field.value || [];

        // resolve label for each selected value from suggestions (fallback to the raw value)
        const selectedTags: TTagOption[] = selectedValues.map((value) => {
          const match = suggestions.find((item) => item.value === value);
          return match ?? { label: value, value };
        });

        const filteredSuggestions = suggestions.filter(
          (item) =>
            item.label.toLowerCase().includes(search.toLowerCase()) &&
            !selectedValues.includes(item.value),
        );

        const addTag = (tag: TTagOption) => {
          field.onChange([...selectedValues, tag.value]);
          setSearch("");
          setOpen(false);
        };

        const removeTag = (value: string) => {
          field.onChange(selectedValues.filter((v) => v !== value));
        };

        return (
          <div className="flex flex-col gap-2" ref={wrapperRef}>
            {label && (
              <label className="font-medium text-gray-600">
                {label}
                {rules && <span className="text-red-500">*</span>}
              </label>
            )}
            <div className="flex flex-wrap gap-1">
              {selectedTags.map((tag) => (
                <div
                  key={tag.value}
                  className="flex items-center gap-1 rounded-md bg-[#00664A]/10 px-2 py-1 text-sm text-[#00664A]"
                >
                  <span>{tag.label}</span>

                  <button
                    className="cursor-pointer"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTag(tag.value);
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <div className="relative">
              <div
                ref={boxRef}
                onClick={() => setOpen(true)}
                className={`flex min-h-12 w-full flex-wrap items-center gap-2 rounded-lg border px-3 py-2 cursor-text ${
                  error
                    ? "border-2 border-red-500"
                    : "border-gray-300 focus-within:ring-2 focus-within:ring-[#00664A]"
                }`}
              >
                <input
                  value={search}
                  onFocus={() => setOpen(true)}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setOpen(true);
                  }}
                  placeholder={placeholder}
                  className="min-w-30 flex-1 border-none outline-none"
                />

                <ChevronDown
                  size={18}
                  className={`text-gray-500 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </div>

              {open &&
                typeof document !== "undefined" &&
                createPortal(
                  <div
                    id={`tag-dropdown-${name}`}
                    style={{
                      position: "absolute",
                      top: position.top,
                      left: position.left,
                      width: position.width,
                      zIndex: 9999,
                    }}
                    className="max-h-60 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg"
                  >
                    {isError ? (
                      <p className="flex flex-col items-center justify-center h-20 text-red-600">
                        Failed to load permissions
                      </p>
                    ) : (
                      <>
                        {isLoading ? (
                          <div className="flex flex-col items-center justify-center h-20">
                            <FaSpinner className="animate-spin h-7 w-7" />
                          </div>
                        ) : (
                          <>
                            {filteredSuggestions.length > 0 ? (
                              filteredSuggestions.map((item) => (
                                <button
                                  key={item.value}
                                  type="button"
                                  onClick={() => addTag(item)}
                                  className="block w-full px-4 py-3 text-left transition-colors hover:bg-gray-100"
                                >
                                  {item.label}
                                </button>
                              ))
                            ) : (
                              <div className="px-4 py-3 text-sm text-gray-500">
                                No suggestions found
                              </div>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>,
                  document.body,
                )}
            </div>

            {error && <p className="text-sm text-red-600">{error.message}</p>}
          </div>
        );
      }}
    />
  );
};

export default CustomTagInput;

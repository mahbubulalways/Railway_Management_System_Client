"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Controller, Control, RegisterOptions } from "react-hook-form";

type TPreview = {
  file: File;
  url: string;
};

type ImageUploadProps = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  multiple?: boolean;
  rules?: RegisterOptions;
  label?: string;
};

const CustomImageUpload = ({
  name,
  control,
  multiple = false,
  rules,
  label,
}: ImageUploadProps) => {
  const [images, setImages] = useState<TPreview[]>([]);

  // cleanup memory
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.url));
    };
  }, [images]);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
          const files = e.target.files;
          if (!files) return;

          const fileArray = Array.from(files);

          const previews = fileArray.map((file) => ({
            file,
            url: URL.createObjectURL(file),
          }));

          setImages(previews);
          field.onChange(fileArray);
        };

        const removeImage = (index: number) => {
          const updated = images.filter((_, i) => i !== index);
          setImages(updated);
          field.onChange(updated.map((img) => img.file));
        };

        return (
          <div className="w-full">
            {label && (
              <label className="block mb-1 text-gray-700 font-medium">
                {label}
              </label>
            )}

            {/* Upload Box */}
            <label
              className={`flex items-center justify-center w-full h-28 border-2 border-dashed rounded-lg cursor-pointer transition
              ${
                fieldState.error
                  ? "border-red-500"
                  : "border-gray-300 hover:border-blue-500"
              }`}
            >
              <p className="text-gray-500 text-sm">
                Click to upload {multiple ? "images" : "image"}
              </p>

              <input
                type="file"
                accept="image/*"
                multiple={multiple}
                className="hidden"
                onChange={handleSelect}
              />
            </label>

            {/* Preview */}
            {images.length > 0 && (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="relative w-full h-24 overflow-hidden rounded-md border"
                  >
                    <Image
                      src={img.url}
                      alt="preview"
                      fill
                      className="object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-black/60 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full hover:bg-red-500 transition"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Error */}
            {fieldState.error && (
              <p className="text-red-500 text-sm mt-2">
                {fieldState.error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

export default CustomImageUpload;

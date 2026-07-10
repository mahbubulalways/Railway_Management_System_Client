"use client";

import React from "react";
import { TrainFront } from "lucide-react";

type RailwayLoaderProps = {
  size?: number;
  color?: string;
  message?: string;
  fullscreen?: boolean;
};

const CustomLoader: React.FC<RailwayLoaderProps> = ({
  size = 50,
  color = "text-[#006A4E]",
  message = "Loading...",
  fullscreen = true,
}) => {
  return (
    <div
      className={`
        flex
        flex-col
        items-center
        justify-center

        ${fullscreen ? "h-[80vh] w-full" : "h-[30vh]"}
      `}
    >
      {/* Loader */}

      <div className="relative">
        {/* outer ring */}

        <div
          className="
            absolute
            inset-0
            animate-ping
            rounded-full
            bg-[#006A4E]/50
          "
        />

        <div
          className={` relative

            flex
           ${fullscreen ? "h-24 w-24" : "h-20 w-20"}

            items-center
            justify-center

            rounded-full

            border-4
            border-[#006A4E]/20

            bg-white

            shadow-xl`}
        >
          <TrainFront
            size={size}
            className={`
              animate-bounce
              ${color}
            `}
          />
        </div>
      </div>

      {/* track */}

      <div
        className="
          mt-5
          flex
          items-center
          gap-1
        "
      >
        {[1, 2, 3, 4, 5].map((item) => (
          <span
            key={item}
            className="
              h-1
              w-4
              rounded-full
              bg-[#006A4E]
              animate-pulse
            "
          />
        ))}
      </div>

      {message && (
        <p
          className="
            mt-4

            text-base
            font-semibold

            text-gray-700
          "
        >
          {message}
        </p>
      )}

      <p
        className="
          mt-1
          text-sm
          text-gray-400
        "
      >
        Bangladesh Railway
      </p>
    </div>
  );
};

export default CustomLoader;

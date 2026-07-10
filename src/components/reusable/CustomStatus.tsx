"use client";

import React from "react";
import { AlertTriangle, Inbox, RefreshCcw } from "lucide-react";

interface CustomStatusProps {
  type: "error" | "empty";
  title?: string;
  description?: string;
  fullScreen?: boolean;
}

const CustomStatus: React.FC<CustomStatusProps> = ({
  type,
  title,
  description,
  fullScreen = true,
}) => {
  const defaults = {
    error: {
      title: "Something went wrong",
      description: "We couldn't load the data. Please try again.",

      icon: (
        <div
          className="
            flex
            h-24
            w-24
            items-center
            justify-center

            rounded-full

            bg-red-50

            text-red-500
          "
        >
          <AlertTriangle size={48} className="animate-pulse" />
        </div>
      ),
    },

    empty: {
      title: "No data available",
      description: "There is currently no information to display.",

      icon: (
        <div
          className="
            flex
            h-24
            w-24
            items-center
            justify-center

            rounded-full

            bg-gray-100

            text-gray-400
          "
        >
          <Inbox size={52} />
        </div>
      ),
    },
  };

  const current = defaults[type];

  return (
    <div
      className={` flex ${fullScreen ? " min-h-[70vh]" : " min-h-[30vh]"}  flex-col
        items-center
        justify-center

        px-6
        text-center`}
    >
      {/* Icon */}

      <div className="mb-3">{current.icon}</div>

      {/* Title */}

      <h2
        className="
          text-2xl
          font-bold
          text-gray-900
        "
      >
        {title || current.title}
      </h2>

      {/* Description */}

      <p
        className="
          mt-2
          max-w-md
          text-sm
          leading-6
          text-gray-500
        "
      >
        {description || current.description}
      </p>

      {/* Error button */}

      {type === "error" && (
        <button
          onClick={() => window.location.reload()}
          className="
            mt-6

            flex
            items-center
            gap-2

            rounded-xl

            bg-[#006A4E]

            px-6
            py-3

            text-sm
            font-semibold
            text-white

            shadow-lg
            shadow-[#006A4E]/20

            transition

            hover:bg-[#00563f]
            hover:shadow-xl

            active:scale-95
          "
        >
          <RefreshCcw size={18} />
          Try Again
        </button>
      )}

      <p
        className="
          mt-8
          text-xs
          text-gray-400
        "
      >
        Bangladesh Railway
      </p>
    </div>
  );
};

export default CustomStatus;

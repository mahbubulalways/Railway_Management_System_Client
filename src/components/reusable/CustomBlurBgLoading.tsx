"use client";

import { FaLeaf } from "react-icons/fa";

const CustomBlurBgLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Spinner */}
        <div
          className={`relative animate-spin rounded-full border-4 border-t-transparent border-green-400`}
          style={{
            width: `48px`,
            height: `48px`,
            borderWidth: `4px`,
          }}
        >
          <FaLeaf
            className="absolute inset-0 m-auto text-green-400"
            size={24}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomBlurBgLoading;

"use client";

import { useEffect } from "react";

const CustomBlurLoader = () => {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
    </div>
  );
};

export default CustomBlurLoader;

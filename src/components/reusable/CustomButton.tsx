"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

type TButtonVariant =
  | "primary"
  | "outline"
  | "ghost"
  | "danger"
  | "success"
  | "warning";

type TButtonProps = {
  children: ReactNode;
  variant?: TButtonVariant;
  isLoading?: boolean;
  fullWidth?: boolean;
  cls?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const CustomButton = ({
  children,
  isLoading,
  variant = "primary",
  fullWidth = true,
  cls,
  ...props
}: TButtonProps) => {
  const baseStyle = "py-2 rounded-md font-medium transition cursor-pointer";

  const variants: Record<TButtonVariant, string> = {
    primary: "bg-[#21872b] text-white hover:bg-[#2ab939]",
    outline:
      "border-2 border-[#1299E8] text-[#1299E8] hover:bg-[#1299E8] hover:text-white",
    ghost: "text-[#1299E8] hover:bg-[#1299E8]/10",
    danger: "bg-red-600 text-white hover:bg-red-700",
    success: "bg-green-600 text-white hover:bg-green-700",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600",
  };

  return (
    <button
      className={`${baseStyle} ${cls} ${fullWidth ? "w-full" : "px-5"} ${variants[variant]} disabled:bg-gray-500 disabled:cursor-default`}
      {...props}
      disabled={isLoading}
    >
      {children}
    </button>
  );
};

export default CustomButton;

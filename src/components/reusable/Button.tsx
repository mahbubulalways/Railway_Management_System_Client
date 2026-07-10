// components/ui/Button.tsx

import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
}

const Button = ({
  children,
  isLoading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`
        group
        flex
        cursor-pointer
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-[#006A4E]
        px-5
        py-3.5
        font-semibold
        text-white
        shadow-lg
        shadow-[#006A4E]/20
        transition-all
        duration-200
        hover:bg-[#00563f]
        hover:shadow-xl
        active:scale-[0.98]
        disabled:cursor-not-allowed
        disabled:bg-gray-400
        disabled:shadow-none

        ${className}
      `}
    >
      {isLoading ? (
        <>
          <Loader2 size={20} className="animate-spin" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;

import { TCustomModalProps, TModalWidth } from "@/interface/modal";
import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const widthClasses: Record<TModalWidth, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-5xl",
};

const CustomModal = ({
  isOpen,
  onClose,
  title,
  children,
  width = "md",
  ref,
}: TCustomModalProps) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      onClick={onClose}
      className="
        fixed inset-0 z-9999
        flex items-center justify-center
        bg-black/50
        backdrop-blur-sm
        px-4
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          w-full
          ${widthClasses[width]}
          overflow-hidden
          rounded-xl
          bg-white
        `}
      >
        {/* Header */}

        <div
          className="
            relative
            flex
            items-center
            justify-between

            px-7
            py-3

          bg-[#006A4E]

            overflow-hidden
          "
        >
          <h2
            className="
              relative
              text-xl
              font-bold
              text-white
              tracking-wide
            "
          >
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
              relative
              flex
              h-10
              w-10
              cursor-pointer
              items-center
              justify-center
              rounded-full
              border-2
              text-white
              bg-red-500
              hover:bg-red-600
              active:scale-90
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div
          ref={ref}
          className="
            max-h-[calc(90vh-90px)]
            overflow-y-auto

            p-7

            scrollbar-thin
            scrollbar-thumb-gray-300
          "
        >
          {children}
        </div>
      </div>
    </div>,

    document.body,
  );
};

export default CustomModal;

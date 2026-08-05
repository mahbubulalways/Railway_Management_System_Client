import { TrainFront } from "lucide-react";
import { createPortal } from "react-dom";

export const LogoutOverlay = () => {
  return createPortal(
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-800/50 backdrop-blur-3xl">
      <div className="relative">
        {/* outer ring */}

        <div
          className="
            absolute
            inset-0
            animate-ping
            rounded-full
            bg-red-700
          "
        />

        <div
          className={` relative

            flex
         h-24 w-24

            items-center
            justify-center

            rounded-full

            border-4
            border-red-600

            bg-white

            shadow-xl`}
        >
          <TrainFront
            size={40}
            className={`
              animate-bounce
              text-red-700
            `}
          />
        </div>
      </div>

      <p
        className="
            mt-4

            font-semibold
text-lg
            text-red-700
          "
      >
        Logging out...
      </p>
    </div>,
    document.body,
  );
};

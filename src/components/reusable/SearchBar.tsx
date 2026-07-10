"use client";

import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { InputHTMLAttributes } from "react";

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onClear?: () => void;
}

const SearchBar = ({
  value,
  onClear,
  className = "",
  ...props
}: SearchBarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParams = (search: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const value = search.trim();

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  const remoevSearchParam = () => {
    updateParams("");
    onClear?.();
  };

  return (
    <div
      className={`
        group
        relative

        flex
        h-13
        w-full
        max-w-md

        items-center

        rounded-2xl

        border
        border-gray-200/70

        bg-white/70

        pl-5
        pr-1.5

        shadow-[0_10px_40px_-8px_rgba(0,0,0,0.10)]

        backdrop-blur-xl

        transition-all
        duration-300
        ease-out

        focus-within:border-[#006A4E]/60
        focus-within:bg-white/90
        focus-within:shadow-[0_10px_40px_-6px_rgba(0,106,78,0.25)]

        ${className}
      `}
    >
      {/* Input */}

      <input
        {...props}
        value={value}
        placeholder={props.placeholder ?? "Search..."}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateParams(value);
          }
        }}
        className="
          h-full
          w-full
          bg-transparent
          text-sm
          font-medium
          tracking-wide
          text-gray-800
          outline-none
          placeholder:font-normal
          placeholder:text-gray-400
        "
      />

      {/* Clear */}

      {value && onClear && (
        <button
          type="button"
          onClick={remoevSearchParam}
          className="
            mr-1.5

            flex
            h-7
            w-7
            shrink-0

            items-center
            justify-center

            rounded-full

            bg-gray-100/80

            text-gray-400

            transition-all
            duration-200

            hover:bg-red-50
            hover:text-red-500

            active:scale-90
          "
        >
          <X size={14} />
        </button>
      )}

      {/* Search button — moved to the right */}

      <button
        type="button"
        onClick={() => updateParams(value)}
        className="
          relative
          cursor-pointer  
          flex
          h-10
          w-10
          shrink-0

          items-center
          justify-center

          overflow-hidden

          rounded-xl

          bg-linear-to-br
          from-[#008A65]
          to-[#004D38]

          text-white

          shadow-[0_4px_14px_rgba(0,106,78,0.35)]

          transition-all
          duration-300

          hover:shadow-[0_6px_18px_rgba(0,106,78,0.45)]
          hover:brightness-110

          active:scale-95

          group-focus-within:scale-105
        "
      >
        {/* subtle inner glow */}
        <span
          className="
            pointer-events-none
            absolute
            inset-0
            bg-linear-to-t
            from-white/0
            via-white/0
            to-white/20
          "
        />
        <Search size={18} className="relative z-10" strokeWidth={2.25} />
      </button>
    </div>
  );
};

export default SearchBar;

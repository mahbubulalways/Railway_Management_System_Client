"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  page: number;
  totalPages: number;
  dataLength: number;
}

export const TablePagination = ({ page, totalPages, dataLength }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const limit = Number(searchParams.get("limit")) || 10;

  const updateParams = (newPage: number, newLimit: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(newPage));
    params.set("limit", String(newLimit));

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4 border-t border-gray-200 bg-gray-50 px-6 py-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <p className="text-sm text-gray-600">
          Showing page{" "}
          <span className="font-semibold text-[#006A4E]">{page}</span>
          {" of "}
          <span className="font-semibold text-gray-900">
            {Math.max(totalPages, 1)}
          </span>
        </p>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-600">Show</span>

          <div className="relative">
            <select
              value={limit}
              onChange={(e) => updateParams(1, Number(e.target.value))}
              className="
                appearance-none
                h-11
                min-w-22.5
                cursor-pointer
                rounded-xl
                border border-gray-200
                bg-white
                pl-4 pr-10
                text-sm
                font-semibold
                text-gray-700
                shadow-sm
                outline-none
                transition-all
                hover:border-[#006A4E]/40
                hover:shadow-md
                focus:border-[#006A4E]
                focus:ring-4
                focus:ring-[#006A4E]/10
              "
            >
              <option value={2}>2</option>
              <option value={5}>5</option>
              <option value={8}>8</option>
              <option value={10}>10</option>
            </select>

            <svg
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          <span className="text-sm font-medium text-gray-600">entries</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => updateParams(page - 1, limit)}
          disabled={page <= 1}
          className=" cursor-pointer
            h-10 rounded-xl border border-gray-300 bg-white px-4
            text-sm font-medium text-gray-700 transition
            hover:border-[#006A4E] hover:text-[#006A4E]
            disabled:cursor-not-allowed disabled:opacity-50
          "
        >
          Previous
        </button>

        <div className="flex items-center rounded-xl border border-[#006A4E] bg-white px-4 py-2">
          <span className="text-sm font-semibold text-[#006A4E]">{page}</span>
        </div>

        <button
          onClick={() => updateParams(page + 1, limit)}
          disabled={page >= totalPages || dataLength == 1}
          className="
            h-10 rounded-xl bg-[#006A4E] px-5 text-sm cursor-pointer
            font-semibold text-white transition
            hover:bg-[#00563f]
            disabled:cursor-not-allowed disabled:opacity-50
          "
        >
          Next
        </button>
      </div>
    </div>
  );
};

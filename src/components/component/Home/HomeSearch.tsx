import { Search } from "lucide-react";

const HomeSearch = () => {
  return (
    <div
      className="
      mx-auto
      w-[calc(100%-2rem)]
      max-w-6xl
      rounded-2xl
      bg-white
      border-8
      border-yellow-600
      p-4
      shadow
      sm:p-6
      "
    >
      {/* Header */}
      {/* <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Find Your Journey
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Search trains, routes and book your ticket
        </p>
      </div> */}

      <div
        className="
        grid
        grid-cols-1
        gap-3
        md:grid-cols-2
        lg:grid-cols-[1fr_1fr_1fr_auto]
        "
      >
        {/* From */}
        <div
          className="
          rounded-xl
          border
          border-gray-200
          bg-white
          px-4
          py-3
          transition
          focus-within:border-green-600
          "
        >
          <label className="block text-xs font-semibold text-gray-500">
            FROM
          </label>

          <div className="flex items-center gap-2">
            <span>📍</span>

            <input
              placeholder="Dhaka"
              className="
              w-full
              text-sm
              font-medium
              text-gray-900
              outline-none
              "
            />
          </div>
        </div>

        {/* To */}

        <div
          className="
          rounded-xl
          border
          border-gray-200
          bg-white
          px-4
          py-3
          transition
          focus-within:border-green-600
          "
        >
          <label className="block text-xs font-semibold text-gray-500">
            TO
          </label>

          <div className="flex items-center gap-2">
            <span>📍</span>

            <input
              placeholder="Chittagong"
              className="
              w-full
              text-sm
              font-medium
              text-gray-900
              outline-none
              "
            />
          </div>
        </div>

        {/* Date */}

        <div
          className="
          rounded-xl
          border
          border-gray-200
          bg-white
          px-4
          py-3
          transition
          focus-within:border-green-600
          "
        >
          <label className="block text-xs font-semibold text-gray-500">
            DATE
          </label>

          <div className="flex items-center gap-2">
            <span>📅</span>

            <input
              type="date"
              className="
              w-full
              text-sm
              font-medium
              text-gray-900
              outline-none
              "
            />
          </div>
        </div>

        {/* Search */}

        <button
          className="
  flex
  h-[60px]
  items-center
  justify-center
  gap-2
  rounded-xl
  bg-[#006A4E]
  px-8
  font-semibold
  text-white
  shadow-md
  transition
  hover:bg-[#00543e]
  active:scale-95
  "
        >
          <Search size={20} />
          Search
        </button>
      </div>
    </div>
  );
};

export default HomeSearch;

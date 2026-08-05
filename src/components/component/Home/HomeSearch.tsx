"use client";

import CustomDatePicker from "@/components/reusable/CustomDatepicker";
import CustomSelect from "@/components/reusable/CustomSelect";
import { useGetStationOptinsQuery } from "@/redux/features/station.features";
import formatLabelValuePair from "@/utils/formatLabelValuePair";
import { CalendarDays, MapPinned, Search, TrainFront } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type SearchFormValues = {
  data: {
    from: string;
    to: string;
    date: string;
  };
};

const HomeSearch = () => {
  const { data, isLoading, isError } = useGetStationOptinsQuery(undefined);
  const convertLabelValue = formatLabelValuePair({
    data: data?.data,
    label: "name",
    value: "stationId",
  });

  const router = useRouter();
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<SearchFormValues>({});

  // eslint-disable-next-line react-hooks/incompatible-library
  const fromStation = watch("data.from");
  const toStation = watch("data.to");
  const fromOptions = convertLabelValue.filter(
    (station) => station.value !== toStation,
  );

  const toOptions = convertLabelValue.filter(
    (station) => station.value !== fromStation,
  );
  const onSubmit = (data: SearchFormValues) => {
    const formattedDate = data.data.date
      ? new Date(data.data.date).toLocaleDateString("en-CA")
      : "";

    const params = new URLSearchParams({
      from: data.data.from,
      to: data.data.to,
      date: formattedDate,
    });

    router.push(`/search-train?${params.toString()}`);
  };

  console.log(errors);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-6xl rounded-2xl bg-white p-4 shadow-xl ring-1 ring-gray-200 sm:p-6"
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr_1fr_180px]">
        {/* FROM */}
        <div>
          <div className="rounded-xl border border-gray-200 px-4 py-1 transition-all focus-within:border-[#006A4E] focus-within:ring-2 focus-within:ring-[#006A4E]/10">
            <div className="mb-2 flex items-center gap-2">
              <MapPinned size={20} className="text-[#006A4E]" />
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                From
              </p>
            </div>

            <CustomSelect
              control={control}
              name="data.from"
              options={fromOptions}
              placeholder="Select departure station"
              searchable
              rules={{ required: "This field is required" }}
              border={false}
            />
          </div>

          {errors?.data?.from && (
            <p className="text-sm text-red-600 mt-1">This field is required</p>
          )}
        </div>

        {/* TO */}
        <div>
          <div className="rounded-xl border border-gray-200 px-4 py-1 transition-all focus-within:border-[#006A4E] focus-within:ring-2 focus-within:ring-[#006A4E]/10">
            <div className="mb-2 flex items-center gap-2">
              <TrainFront size={20} className="text-[#006A4E]" />
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                To
              </p>
            </div>

            <CustomSelect
              control={control}
              name="data.to"
              options={toOptions}
              placeholder="Select destination station"
              searchable
              border={false}
              rules={{ required: "This field is required" }}
            />
          </div>
          {errors?.data?.to && (
            <p className="text-sm text-red-600 mt-1">This field is required</p>
          )}
        </div>
        {/* DATE */}
        <div>
          <div className="rounded-xl border border-gray-200 px-4 py-1 transition-all focus-within:border-[#006A4E] focus-within:ring-2 focus-within:ring-[#006A4E]/10">
            <div className="mb-2 flex items-center gap-2">
              <CalendarDays size={20} className="text-[#006A4E]" />
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Journey Date
              </p>
            </div>

            <CustomDatePicker
              control={control}
              name="data.date"
              // disablePastDates
              border={false}
              rules={{ required: "This field is required" }}
            />
          </div>
          {errors?.data?.date && (
            <p className="text-sm text-red-600 mt-1">This field is required</p>
          )}
        </div>
        {/* SEARCH BUTTON */}
        <button
          type="submit"
          className="flex min-h-[74px] items-center justify-center gap-2 rounded-xl bg-[#006A4E] px-6 font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#00543E] hover:shadow-lg active:scale-95"
        >
          <Search size={20} />
          Search Trains
        </button>
      </div>
    </form>
  );
};

export default HomeSearch;

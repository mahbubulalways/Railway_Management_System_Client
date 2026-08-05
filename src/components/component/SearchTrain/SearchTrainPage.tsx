"use client";
import SHowRouteStationModal from "@/components/modals/SHowRouteStationModal";
import CustomLoader from "@/components/reusable/CustomLoader";
import CustomStatus from "@/components/reusable/CustomStatus";
import { IRouteStation } from "@/interface/route";
import { IScheduleResponse } from "@/interface/schedule";
import { useSearchTrainQuery } from "@/redux/features/schedule.features";
import { getJourneyDuration } from "@/utils/getJourneyDuration";
import { ArrowRight, Clock3, MapPin, Route, Train, X } from "lucide-react";
import { useState } from "react";

const SearchTrainPage = ({
  from,
  to,
  date,
}: {
  from: string;
  to: string;
  date: string;
}) => {
  const info = {
    from,
    to,
    date,
  };
  const { data, isLoading, isError } = useSearchTrainQuery(info, {
    refetchOnMountOrArgChange: true,
  });

  // Holds the schedule currently shown in the stops modal, or null when closed.
  const [stations, setStations] = useState<IRouteStation[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const trainData = data?.data;

  if (isLoading) return <CustomLoader />;

  if (isError) {
    return (
      <CustomStatus
        type="error"
        title="Error"
        description="Failed to load trainData."
      />
    );
  }

  if (!trainData?.length) {
    return (
      <CustomStatus
        type="error"
        title="No Train"
        description="No train found for this station."
      />
    );
  }
  console.log(trainData);
  return (
    <div className="container space-y-5">
      {trainData.map(
        ({ schedule }: { schedule: IScheduleResponse }, index: number) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
          >
            {/* Header */}
            <div className="relative overflow-hidden bg-[#00543F]/90 px-6 py-6 text-white sm:px-8">
              <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-10 left-10 h-32 w-32 rounded-full bg-white/5 blur-2xl" />

              <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md">
                    <Train size={28} />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold tracking-tight sm:text-[1.7rem]">
                      {schedule.train.name}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-white/10 px-5 py-3 backdrop-blur-md lg:bg-white lg:px-6 lg:py-3">
                  <Clock3
                    size={18}
                    className="text-white/70 lg:text-[#006A4E]"
                  />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-white/70 lg:text-gray-500">
                      Departure
                    </p>
                    <h3 className="text-lg font-bold leading-tight text-white lg:text-[#006A4E]">
                      {schedule.startTime}
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Route */}
            <div className="border-b border-gray-100 px-6 py-7 sm:px-8">
              <p className="font-semibold text-center text-sm text-[#006A4E]">
                {getJourneyDuration(
                  schedule?.startTime,
                  schedule?.arrialvalTime as string,
                )}
              </p>
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0 text-left">
                  <p className="truncate  font-bold text-gray-900 ">
                    {schedule.route.sourceStation.name}
                  </p>
                  <span className="mt-1.5 inline-block rounded-full bg-emerald-50 px-3 py-1  font-semibold text-[#006A4E]">
                    {schedule.startTime}
                  </span>
                </div>

                <div className="mx-2 flex flex-1 flex-col items-center sm:mx-6">
                  <div className="flex w-full items-center">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#006A4E]" />
                    <span className="h-[2px] flex-1 bg-gradient-to-r from-[#006A4E] to-[#00A676]" />
                    <ArrowRight
                      className="mx-1.5 shrink-0 text-[#006A4E]"
                      size={18}
                    />
                    <span className="h-[2px] flex-1 bg-gradient-to-r from-[#00A676] to-[#006A4E]" />
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#006A4E]" />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(true);
                      setStations(schedule.route.routeStations);
                    }}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#006A4E]/10 px-4 py-1.5 text-xs font-semibold text-[#006A4E] transition-colors hover:bg-[#006A4E] hover:text-white text-nowrap"
                  >
                    <MapPin size={13} />
                    View stops
                  </button>
                </div>

                <div className="min-w-0 text-right">
                  <p className="truncate  font-bold text-gray-900 ">
                    {schedule.route.destinationStation.name}
                  </p>
                  <span className="mt-1.5 inline-block rounded-full bg-red-50 px-3 py-1  font-semibold text-red-600">
                    {schedule.arrialvalTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 bg-gray-50/70 p-4 lg:grid-cols-4 lg:gap-4 lg:p-6">
              <StatCard
                icon={<Clock3 size={18} />}
                iconClass="bg-[#006A4E]/10 text-[#006A4E]"
                label="Departure"
                value={schedule.startTime}
              />
              <StatCard
                icon={<Route size={18} />}
                iconClass="bg-blue-100 text-blue-600"
                label="Stops"
                value={String(schedule.route.routeStations.length)}
              />
              <StatCard
                icon={<ArrowRight size={18} />}
                iconClass="bg-purple-100 text-purple-600"
                label="Distance"
                value={`${schedule.route.distance} km`}
              />
              <StatCard
                icon={<Train size={18} />}
                iconClass="bg-amber-100 text-amber-600"
                label="Type"
                value={schedule.train.type}
              />
            </div>
          </div>
        ),
      )}

      {/* Stops modal */}
      {isOpen && (
        <SHowRouteStationModal
          isOpen={isOpen}
          stations={stations!}
          onClose={() => setIsOpen(false)}
          setStations={setStations}
        />
      )}
    </div>
  );
};

const StatCard = ({
  icon,
  iconClass,
  label,
  value,
}: {
  icon: React.ReactNode;
  iconClass: string;
  label: string;
  value: string;
}) => (
  <div className="rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
    <div
      className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl lg:h-11 lg:w-11 ${iconClass}`}
    >
      {icon}
    </div>
    <p className="text-[11px] text-gray-500 lg:text-xs">{label}</p>
    <h3 className="mt-1 truncate text-sm font-semibold text-gray-900 lg:text-base">
      {value}
    </h3>
  </div>
);

export default SearchTrainPage;

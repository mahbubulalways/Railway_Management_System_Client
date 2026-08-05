"use client";

import {
  Calendar,
  Clock3,
  ArrowRight,
  Route,
  Train,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

import CustomLoader from "@/components/reusable/CustomLoader";
import CustomStatus from "@/components/reusable/CustomStatus";
import { useGetAllTrainOfAStationQuery } from "@/redux/features/train.features";
import { IScheduleResponse } from "@/interface/schedule";
import { ITrain } from "@/interface/train";
import TrainRouteTimeline from "./TrainRouteTimeline";
import { useState } from "react";

const ViewTrainPage = () => {
  const { data, isLoading, isError } = useGetAllTrainOfAStationQuery(undefined);
  const [openRoute, setOpenRoute] = useState<string | null>(null);
  if (isLoading) return <CustomLoader />;

  if (isError) {
    return (
      <CustomStatus
        type="error"
        title="Error"
        description="Failed to load trains."
      />
    );
  }

  const trains = data?.data ?? [];

  if (!trains.length) {
    return (
      <CustomStatus
        type="error"
        title="No Train"
        description="No train found for this station."
      />
    );
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl bg-linear-to-r from-[#006A4E] to-[#004A38] p-6 text-white">
        <h1 className="text-3xl font-bold">Station Trains</h1>
        <p className="mt-1 text-white/80">Total Trains: {trains.length}</p>
      </div>

      <div className="space-y-6">
        {trains.map(({ train }: { train: ITrain }, idx: number) => (
          <div
            key={idx}
            className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-md"
          >
            {/* Train Header */}
            <div className="flex items-center justify-between  p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#006A4E] text-white">
                  <Train size={24} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold">{train.name}</h2>

                  <p className="text-sm text-gray-500">
                    {train.schedules.length} Schedule
                    {train.schedules.length > 1 && "s"}
                  </p>
                </div>
              </div>
            </div>

            {/* Schedules */}
            <div className="space-y-4 p-5">
              {train.schedules.map((schedule: IScheduleResponse, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-gray-100 bg-gray-50 p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {schedule.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {schedule.direction} Direction
                      </p>
                    </div>

                    <span className="rounded-full bg-[#006A4E]/10 px-3 py-1 text-sm font-medium text-[#006A4E]">
                      {schedule.startTime}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-3">
                    <div className="flex items-center gap-3">
                      <Route className="text-[#006A4E]" size={18} />

                      <div>
                        <p className="text-xs text-gray-400">Route</p>

                        <p className="font-medium">{schedule.route.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <ArrowRight className="text-[#006A4E]" size={18} />

                      <div>
                        <p className="text-xs text-gray-400">Distance</p>

                        <p className="font-medium">
                          {schedule.route.distance} km
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock3 className="text-[#006A4E]" size={18} />

                      <div>
                        <p className="text-xs text-gray-400">Departure</p>

                        <p className="font-medium">{schedule.startTime}</p>
                      </div>
                    </div>
                  </div>

                  {/* Running Days */}
                  <div className="mt-5">
                    <div className="mb-2 flex items-center gap-2">
                      <Calendar size={16} className="text-[#006A4E]" />

                      <span className="text-sm font-medium">Running Days</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {schedule.runningDays.map((day: string) => (
                        <span
                          key={day}
                          className="rounded-full bg-[#006A4E]/10 px-3 py-1 text-xs font-medium text-[#006A4E]"
                        >
                          {day.slice(0, 3)}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={() =>
                        setOpenRoute((prev) =>
                          prev === schedule.id ? null : schedule.id,
                        )
                      }
                      className="flex w-full items-center justify-between rounded-xl border border-[#006A4E]/20 bg-[#006A4E]/10 px-4 py-3 font-medium text-[#006A4E] transition hover:bg-[#006A4E]/10 cursor-pointer"
                    >
                      <span>
                        {openRoute === schedule.id
                          ? "Hide Route Timeline"
                          : "View Route Timeline"}
                      </span>

                      {openRoute === schedule.id ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openRoute === schedule.id
                          ? "mt-5 max-h-[5000px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <TrainRouteTimeline
                        routeStations={schedule.route.routeStations}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewTrainPage;

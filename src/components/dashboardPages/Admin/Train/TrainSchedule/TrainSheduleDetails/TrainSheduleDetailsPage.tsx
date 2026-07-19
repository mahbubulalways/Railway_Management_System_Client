"use client";
import CustomLoader from "@/components/reusable/CustomLoader";
import CustomStatus from "@/components/reusable/CustomStatus";
import { IRouteStation } from "@/interface/route";
import { IScheduleResponse, ITripInstance } from "@/interface/schedule";
import { useGetSingleScheduleQuery } from "@/redux/features/schedule.features";
import moment from "moment";
import Link from "next/link";
import React from "react";

const TrainSheduleDetailsPage = ({ id }: { id: string }) => {
  const { isError, isLoading, data } = useGetSingleScheduleQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const schedule = data?.data as IScheduleResponse;

  if (isLoading) return <CustomLoader />;
  if (isError) return <CustomStatus type="error" />;
  if (!schedule) return <CustomStatus type="empty" />;
  console.log(schedule.route.routeStations);
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow">
        {/* Hero */}
        <div className="bg-linear-to-br from-[#006A4E] via-[#00553D] to-[#003B2A] p-8 text-white">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                {schedule.name}
              </h1>

              <p className="mt-2 text-lg text-white/80">
                {schedule.train.trainId} • {schedule.route.name}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur">
                  🚆 {schedule.train.name}
                </span>

                <span className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium backdrop-blur">
                  {schedule.direction}
                </span>

                <span
                  className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                    schedule.isActive ? "bg-green-500/90" : "bg-red-500/90"
                  }`}
                >
                  {schedule.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">
              <p className="text-sm text-white/70">Departure Time</p>

              <h2 className="mt-1 text-4xl font-bold">{schedule.startTime}</h2>

              <p className="mt-2 text-sm text-white/70">
                {schedule.runningDays.map((d) => d.slice(0, 3)).join(" • ")}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 divide-x divide-y border-t divide-gray-200 border-gray-50 sm:grid-cols-4 sm:divide-y-0">
          <div className="flex flex-col items-center py-5">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Route Stations
            </p>
            <h3 className="mt-1 text-2xl font-bold">
              {schedule.route.routeStations.length}
            </h3>
          </div>

          <div className="flex flex-col items-center py-5">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Trips
            </p>
            <h3 className="mt-1 text-2xl font-bold">
              {schedule.tripInstances.length}
            </h3>
          </div>

          <div className="flex flex-col items-center py-5">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Booking Opens
            </p>
            <h3 className="mt-1 text-2xl font-bold">
              {schedule.bookingOpenDays} Days
            </h3>
          </div>

          <div className="flex flex-col items-center py-5">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Valid Until
            </p>
            <h3 className="mt-1 text-lg font-bold">
              {moment(schedule.validUntil).format("DD MMM YYYY")}
            </h3>
          </div>
        </div>
      </div>

      {/* SEPARATION LINE */}

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Route Stations</h2>
            <p className="text-sm text-gray-500">
              {schedule.route.routeStations.length} Stations
            </p>
          </div>

          <span className="rounded-full bg-[#006A4E]/10 px-4 py-2 text-sm font-medium text-[#006A4E]">
            {schedule.direction}
          </span>
        </div>

        <div className="relative">
          <div className="absolute left-5 top-0 h-full w-2 bg-gray-700" />

          <div className="flex flex-col gap-5">
            {schedule.route.routeStations.map(
              (station: IRouteStation, index: number) => (
                <Link
                  href={`/dashboard/admin/stations/details/${station?.stationId}`}
                  key={station.id}
                >
                  <div className="relative flex gap-5 rounded-xl border border-gray-100 bg-white p-5  hover:shadow-md">
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#006A4E] font-semibold text-white">
                      {index + 1}
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {station.station.name}
                          </h3>

                          <p className="mt-1 text-sm text-gray-500">
                            Platform {station.platform}
                          </p>
                        </div>

                        <div className="grid grid-cols-3 gap-6 text-center">
                          <div>
                            <p className="text-xs uppercase text-gray-400">
                              Arrival
                            </p>

                            <p className="font-semibold">
                              {station.arrivalTime ?? "--"}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs uppercase text-gray-400">
                              Stop
                            </p>

                            <p className="font-semibold">
                              {station.stopTime} Min
                            </p>
                          </div>

                          <div>
                            <p className="text-xs uppercase text-gray-400">
                              Departure
                            </p>

                            <p className="font-semibold">
                              {station.departureTime ?? "--"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                </Link>
              ),
            )}
          </div>
        </div>
      </div>

      {/* TRIP INSTANCE */}

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Trip Instances</h2>
            <p className="text-sm text-gray-500">
              {schedule.tripInstances.length} Scheduled Trips
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {schedule.tripInstances.map((trip: ITripInstance, index: number) => (
            <div
              key={trip.id}
              className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#006A4E]/30 hover:shadow-lg"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Trip #{index + 1}
                  </p>

                  <h3 className="mt-1 text-lg font-semibold">
                    {moment(trip.journeyDate).format("DD MMM YYYY")}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {moment(trip.journeyDate).format("dddd • hh:mm A")}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    trip.status === "SCHEDULED"
                      ? "bg-green-100 text-green-700"
                      : trip.status === "COMPLETED"
                        ? "bg-blue-100 text-blue-700"
                        : trip.status === "CANCELLED"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {trip.status}
                </span>
              </div>

              {/* Divider */}
              <div className="my-5 border-t border-dashed border-gray-300" />

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-gray-50 p-4 text-center">
                  <p className="text-xs uppercase text-gray-400">Total Seats</p>

                  <h4 className="mt-1 text-2xl font-bold">{trip.totalSeats}</h4>
                </div>

                <div className="rounded-xl bg-[#006A4E]/5 p-4 text-center">
                  <p className="text-xs uppercase text-[#006A4E]">Available</p>

                  <h4 className="mt-1 text-2xl font-bold text-[#006A4E]">
                    {trip.availableSeats}
                  </h4>
                </div>
              </div>

              {/* Bottom */}
              <div className="mt-5 flex items-center justify-between border-t border-gray-300 pt-4">
                <div>
                  <p className="text-xs text-gray-400">Booked Seats</p>

                  <p className="font-semibold">
                    {trip.totalSeats - trip.availableSeats}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-400">Occupancy</p>

                  <p className="font-semibold text-[#006A4E]">
                    {Math.round(
                      ((trip.totalSeats - trip.availableSeats) /
                        trip.totalSeats) *
                        100,
                    )}
                    %
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainSheduleDetailsPage;
const Info = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="mt-1 font-semibold">{value}</p>
  </div>
);

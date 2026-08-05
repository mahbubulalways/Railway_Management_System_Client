"use client";

import { IRouteStation } from "@/interface/route";
import { ArrowRight, Flag, MapPin, TrainFront } from "lucide-react";

type Props = {
  routeStations: IRouteStation[];
};

const TrainRouteTimeline = ({ routeStations }: Props) => {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Route Timeline
          </h3>

          <p className="text-sm text-gray-500">
            {routeStations.length} Stations
          </p>
        </div>
      </div>

      <div className="relative">
        {routeStations.map((station, index) => {
          const isFirst = index === 0;
          const isLast = index === routeStations.length - 1;

          return (
            <div
              key={station.id}
              className="relative flex gap-5 pb-6 last:pb-0"
            >
              {/* Timeline */}
              <div className="relative flex w-12 flex-col items-center">
                {!isLast && (
                  <div className="absolute top-10 h-full w-[2px] bg-[#006A4E]/20" />
                )}

                <div
                  className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full
                  ${
                    isFirst
                      ? "bg-[#006A4E] text-white"
                      : isLast
                        ? "bg-red-500 text-white"
                        : "border-2 border-[#006A4E] bg-white text-[#006A4E]"
                  }`}
                >
                  {isFirst ? (
                    <TrainFront size={18} />
                  ) : isLast ? (
                    <Flag size={18} />
                  ) : (
                    <MapPin size={18} />
                  )}
                </div>
              </div>

              {/* Card */}
              <div className="flex-1 rounded-2xl border border-gray-100 bg-gray-50 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-lg font-semibold">
                      {station.station.name}
                    </h4>

                    <p className="mt-1 text-sm text-gray-500">
                      {station.station.stationId}
                    </p>
                  </div>

                  {isFirst && (
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                      Origin
                    </span>
                  )}

                  {isLast && (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                      Destination
                    </span>
                  )}

                  {!isFirst && !isLast && station.isMajorStop && (
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                      Major Stop
                    </span>
                  )}
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-4">
                  <div>
                    <p className="text-xs text-gray-400">Platform</p>
                    <p className="font-medium">{station.platform || "-"}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Stop Time</p>
                    <p className="font-medium">{station.stopTime} min</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Distance</p>
                    <p className="font-medium text-[#006A4E]">
                      {station.distanceFromStart} km
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Travel Time</p>
                    <p className="font-medium text-[#006A4E]">
                      {station.travelTimeFromPrevious} min
                    </p>
                  </div>
                </div>

                {!isLast && (
                  <div className="mt-5 flex items-center gap-2 text-sm font-medium text-[#006A4E]">
                    <ArrowRight size={16} />
                    Next:
                    <span>{routeStations[index + 1].station.name}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrainRouteTimeline;

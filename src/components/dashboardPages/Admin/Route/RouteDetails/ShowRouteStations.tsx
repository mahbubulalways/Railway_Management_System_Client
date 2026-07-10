import { IRouteStation } from "@/interface/route";
import { ArrowRight, Flag, MapPin, Pencil, TrainFront } from "lucide-react";

const ShowRouteStations = ({
  routeStations,
}: {
  routeStations: IRouteStation[];
}) => {
  return (
    <div className="mx-auto max-w-6xl py-10">
      <div className="relative">
        {routeStations.map((station, index) => {
          const isFirst = index === 0;
          const isLast = index === routeStations.length - 1;

          return (
            <div
              key={station.id}
              className="relative mb-5 flex items-start gap-8 last:mb-0"
            >
              {/* ================= Timeline ================= */}

              <div className="relative flex w-24 flex-col items-center">
                {!isLast && (
                  <div className="absolute top-16 h-[calc(100%+75px)] w-1 rounded-b-full bg-linear-to-b from-[#006A4E] via-[#2b8b6d] to-[#d7efe6]" />
                )}

                <div
                  className={`relative z-20 flex h-16 w-16 items-center justify-center rounded-full shadow-xl ring-8 transition-all duration-300
                    ${
                      isFirst
                        ? "bg-[#006A4E] text-white ring-[#006A4E]/10"
                        : isLast
                          ? "bg-red-500 text-white ring-red-100"
                          : "border-2 border-[#006A4E] bg-white text-[#006A4E] ring-[#006A4E]/10"
                    }`}
                >
                  {isFirst ? (
                    <TrainFront size={24} />
                  ) : isLast ? (
                    <Flag size={24} />
                  ) : (
                    <MapPin size={22} />
                  )}
                </div>

                {!isLast && (
                  <div className="z-20 mt-5 w-full rounded-2xl border border-gray-200 bg-white p-3 text-center shadow-lg">
                    <p className="text-xl font-bold text-[#006A4E]">
                      {routeStations[index + 1].distanceFromPrevious} km
                    </p>

                    <div className="mt-1 flex items-center justify-center gap-2 text-xs text-gray-500">
                      <ArrowRight size={13} />
                      {routeStations[index + 1].travelTimeFromPrevious} min
                    </div>
                  </div>
                )}
              </div>

              {/* ================= Card ================= */}

              <div className="group flex-1 rounded-[28px] border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#006A4E]/20 hover:shadow-2xl">
                <div className="flex items-center justify-between border-b border-gray-100 px-8 py-6">
                  <div className="flex items-center gap-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#006A4E]  text-lg font-bold text-white shadow-md">
                      {station.sequence}
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        {station.station.name}
                      </h2>

                      <span className="mt-2 inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                        {station.stationId}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {isFirst && (
                      <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                        Origin
                      </span>
                    )}

                    {isLast && (
                      <span className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                        Destination
                      </span>
                    )}

                    {!isFirst && !isLast && station.isMajorStop && (
                      <span className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
                        Major Stop
                      </span>
                    )}

                    <button className="flex items-center gap-2 bg-[#006A4E] text-white shadow px-4 py-1.5 rounded-full">
                      <Pencil className="mr-2 h-4 w-4" />
                      Update
                    </button>
                  </div>
                </div>

                {/* ======= Next Part ======= */}

                <div>
                  <div className="space-y-6 p-5">
                    <div className="grid grid-cols-4 gap-4 xl:grid-cols-4">
                      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                        <p className="text-sm text-gray-500">Platform</p>

                        <p className="mt-2  font-semibold text-gray-900">
                          {station.platform || "-"}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                        <p className="text-sm text-gray-500">Stop Time</p>

                        <p className="mt-2  font-semibold text-gray-900">
                          {station.stopTime} min
                        </p>
                      </div>

                      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                        <p className="text-sm text-gray-500">
                          Distance From Origin
                        </p>

                        <p className="mt-2  font-semibold text-[#006A4E]">
                          {station.distanceFromStart} km
                        </p>
                      </div>

                      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                        <p className="text-sm text-gray-500">
                          Travel From Previous
                        </p>

                        <p className="mt-2  font-semibold text-[#006A4E]">
                          {station.travelTimeFromPrevious} min
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {!isLast && (
                  <div className="flex items-center justify-between bg-[#006A4E]/5 px-6 py-4 text-sm">
                    <span className="font-medium text-gray-600">
                      Next Station
                    </span>

                    <div className="flex items-center gap-2 font-semibold text-[#006A4E]">
                      {routeStations[index + 1].station?.name}
                      <ArrowRight className="h-4 w-4" />
                    </div>
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

export default ShowRouteStations;

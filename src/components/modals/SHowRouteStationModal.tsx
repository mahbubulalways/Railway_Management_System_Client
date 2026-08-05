import {
  Train,
  MapPin,
  Clock3,
  Timer,
  Route,
  Flag,
  CircleDot,
} from "lucide-react";

import { TCustomModalProps } from "@/interface/modal";
import { IRouteStation } from "@/interface/route";
import { Dispatch, SetStateAction } from "react";
import CustomModal from "../reusable/CustomModal";

type TProps = {
  stations: IRouteStation[];
  setStations: Dispatch<SetStateAction<IRouteStation[] | null>>;
} & TCustomModalProps;
const SHowRouteStationModal = ({ isOpen, onClose, stations }: TProps) => {
  console.log(stations);
  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title="🚉 Route Information"
      width="xl"
    >
      <div className="max-h-[70vh] overflow-y-auto px-2 py-4">
        <div className="relative ml-5">
          {stations.map((station, index) => {
            const isFirst = index === 0;
            const isLast = index === stations.length - 1;

            return (
              <div key={station.id} className="group relative pb-10 last:pb-0">
                {/* Vertical Line */}
                {!isLast && (
                  <div className="absolute left-[17px] top-10 h-full w-[3px] rounded-full bg-gradient-to-b from-[#006A4E] via-[#009970] to-gray-300" />
                )}

                <div className="flex gap-5">
                  {/* Timeline Icon */}
                  <div
                    className={`z-10 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white shadow-lg transition-all duration-300 group-hover:scale-200
                ${
                  isFirst
                    ? "bg-green-600"
                    : isLast
                      ? "bg-red-500"
                      : "bg-[#006A4E]"
                }`}
                  >
                    {isFirst ? (
                      <MapPin size={18} className="text-white" />
                    ) : isLast ? (
                      <Flag size={18} className="text-white" />
                    ) : (
                      <Train size={16} className="text-white" />
                    )}
                  </div>

                  {/* Card */}
                  <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-base font-bold text-gray-900">
                          {station.station.name}
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                          Railway Station
                        </p>
                      </div>

                      <span className="rounded-full bg-[#006A4E]/10 px-3 py-1 text-[11px] font-semibold text-[#006A4E]">
                        {station.platform}
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
                      <div className="rounded-xl bg-green-50 p-3 text-center">
                        <Route
                          size={18}
                          className="mx-auto mb-2 text-green-600"
                        />

                        <p className="text-[10px] uppercase tracking-wide text-gray-500">
                          Distance
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          {station.distanceFromStart} km
                        </p>
                      </div>

                      <div className="rounded-xl bg-blue-50 p-3 text-center">
                        <Clock3
                          size={18}
                          className="mx-auto mb-2 text-blue-600"
                        />

                        <p className="text-[10px] uppercase tracking-wide text-gray-500">
                          Arrival
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          {station.arrivalTime ?? "--"}
                        </p>
                      </div>

                      <div className="rounded-xl bg-amber-50 p-3 text-center">
                        <Timer
                          size={18}
                          className="mx-auto mb-2 text-amber-600"
                        />

                        <p className="text-[10px] uppercase tracking-wide text-gray-500">
                          Halt
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          {station.stopTime} min
                        </p>
                      </div>

                      <div className="rounded-xl bg-purple-50 p-3 text-center">
                        <Train
                          size={18}
                          className="mx-auto mb-2 text-purple-600"
                        />

                        <p className="text-[10px] uppercase tracking-wide text-gray-500">
                          Depart
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          {station.departureTime ?? "--"}
                        </p>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="mt-5">
                      {isFirst && (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                          🚉 Origin Station
                        </span>
                      )}

                      {isLast && (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                          🏁 Destination
                        </span>
                      )}

                      {!isFirst && !isLast && (
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                          ● En Route Stop
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </CustomModal>
  );
};

export default SHowRouteStationModal;

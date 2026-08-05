"use client";

import CustomLoader from "@/components/reusable/CustomLoader";
import CustomStatus from "@/components/reusable/CustomStatus";
import { IStationWithPlatforms } from "@/interface/station";
import { useGetStaffStationQuery } from "@/redux/features/station.features";
import { MapPin, Phone, Mail, Calendar, Train } from "lucide-react";
import moment from "moment";
import StationStaffSection from "./StationStaffSection";
import StationEntitySection from "./StationEntitySection";

const UpdateStationPage = () => {
  const { isError, isLoading, data } = useGetStaffStationQuery({
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <CustomLoader />;
  }

  if (isError) {
    return (
      <CustomStatus
        type="error"
        description="Something went wrong"
        title="Error"
      />
    );
  }

  const station = data?.data as IStationWithPlatforms;

  if (!station) {
    return (
      <CustomStatus
        type="error"
        description="Station not found"
        title="No data"
      />
    );
  }

  return (
    <div>
      {/* Header card */}
      <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
        <div className="bg-linear-to-br from-[#006A4E] to-[#00432F] px-6 py-7 sm:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/60">
                {station.stationId}
              </p>
              <h1 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
                {station.name}
              </h1>
              <div className="mt-3 flex items-center gap-2 text-sm text-white/80">
                <MapPin size={15} />
                <span>
                  {station.district}, {station.division}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  station.status === "Active"
                    ? "bg-emerald-400/20 text-emerald-200"
                    : "bg-red-400/20 text-red-200"
                }`}
              >
                {station.status}
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium capitalize text-white/90">
                {station.type}
              </span>
            </div>
          </div>
        </div>

        {/* Quick info strip */}
        <div className="grid grid-cols-2 divide-x divide-gray-100 border-t border-gray-100 sm:grid-cols-4">
          <div className="flex items-center gap-2 px-5 py-4">
            <Calendar size={16} className="text-[#006A4E]" />
            <div>
              <p className="text-[11px] text-gray-400">Established</p>
              <p className="text-sm font-semibold text-gray-800">
                {moment(station.established).format("ll")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-4">
            <Train size={16} className="text-[#006A4E]" />
            <div>
              <p className="text-[11px] text-gray-400">Platforms</p>
              <p className="text-sm font-semibold text-gray-800">
                {station.platforms?.length > 10 ? "" : 0}
                {station.platforms?.length ?? 0}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-4">
            <Phone size={16} className="text-[#006A4E]" />
            <div>
              <p className="text-[11px] text-gray-400">Phone</p>
              <p className="text-sm font-semibold text-gray-800">
                {station.phone}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-4">
            <Mail size={16} className="text-[#006A4E]" />
            <div className="min-w-0">
              <p className="text-[11px] text-gray-400">Email</p>
              <p
                title="Send Mail"
                className="truncate hover:underline cursor-pointer text-sm font-semibold text-gray-800"
              >
                {station.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      {station.notes && (
        <p className="mt-4 rounded-2xl bg-[#006A4E]/5 px-5 py-3 text-sm text-gray-600">
          {station.notes}
        </p>
      )}
      <StationEntitySection station={station} />
      <StationStaffSection staffs={station?.staffs} />
    </div>
  );
};

export default UpdateStationPage;

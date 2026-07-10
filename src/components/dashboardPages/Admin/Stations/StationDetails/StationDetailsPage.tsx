"use client";

import CustomLoader from "@/components/reusable/CustomLoader";
import CustomStatus from "@/components/reusable/CustomStatus";
import { IStationWithPlatforms } from "@/interface/station";
import { useGetSingleStationQuery } from "@/redux/features/station.features";
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  Train,
  Wifi,
  ParkingCircle,
  Utensils,
  Accessibility,
  ArrowUpDown,
  ShieldCheck,
  Speaker,
  MonitorPlay,
  Ticket,
  Globe,
  Camera,
  Sparkles,
  ToiletIcon,
} from "lucide-react";
import moment from "moment";

const StationDetailsPage = ({ stationId }: { stationId: string }) => {
  const { isError, isLoading, data } = useGetSingleStationQuery(stationId, {
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

  const amenities = [
    { label: "Wi-Fi", available: station.wifi, icon: Wifi },
    { label: "Parking", available: station.parking, icon: ParkingCircle },
    { label: "Food court", available: station.foodCourt, icon: Utensils },
    { label: "Lift", available: station.lift, icon: ArrowUpDown },
    { label: "Escalator", available: station.escalator, icon: ArrowUpDown },
    {
      label: "Wheelchair access",
      available: station.wheelchairAccess,
      icon: Accessibility,
    },
    { label: "Washroom", available: station.washroom, icon: ToiletIcon },
    { label: "ATM", available: station.atm, icon: Ticket },
    { label: "CCTV", available: station.cctv, icon: Camera },
    {
      label: "Security service",
      available: station.securityService,
      icon: ShieldCheck,
    },
    {
      label: "Ticket counter",
      available: station.ticketCounter,
      icon: Ticket,
    },
    {
      label: "Online ticket",
      available: station.onlineTicketSupport,
      icon: Globe,
    },
    {
      label: "Display board",
      available: station.hasDisplayBoard,
      icon: MonitorPlay,
    },
    {
      label: "Announcement system",
      available: station.hasAnnouncementSystem,
      icon: Speaker,
    },
    { label: "Prayer room", available: station.prayerRoom, icon: Sparkles },
  ];

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

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Amenities */}
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Amenities
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {amenities.map(({ label, available, icon: Icon }) => (
              <div
                key={label}
                className={`flex items-center gap-2.5 rounded-2xl border px-3 py-3 text-sm transition ${
                  available
                    ? "border-[#006A4E]/20 bg-[#006A4E]/5 text-gray-800"
                    : "border-gray-100 bg-gray-50 text-gray-400"
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                    available
                      ? "bg-[#006A4E] text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  <Icon size={15} />
                </div>
                <span className="font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Platforms */}
        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Platforms
          </h2>
          <div className="space-y-3">
            {station.platforms?.map((platform) => (
              <div
                key={platform.id}
                className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-800">{platform.name}</p>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                      platform.status === "Active"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-red-50 text-red-500"
                    }`}
                  >
                    {platform.status}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-400">{platform.type}</p>

                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl bg-gray-50 py-2">
                    <p className="text-sm font-semibold text-gray-800">
                      {platform.length}m
                    </p>
                    <p className="text-[10px] text-gray-400">Length</p>
                  </div>
                  <div className="rounded-xl bg-gray-50 py-2">
                    <p className="text-sm font-semibold text-gray-800">
                      {platform.capacity}
                    </p>
                    <p className="text-[10px] text-gray-400">Capacity</p>
                  </div>
                  <div className="rounded-xl bg-gray-50 py-2">
                    <p className="text-sm font-semibold text-gray-800">
                      {platform.hasRoof ? "Yes" : "No"}
                    </p>
                    <p className="text-[10px] text-gray-400">Roof</p>
                  </div>
                </div>
              </div>
            ))}

            {(!station.platforms || station.platforms.length === 0) && (
              <p className="rounded-2xl border border-dashed border-gray-200 px-4 py-6 text-center text-sm text-gray-400">
                No platform data available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationDetailsPage;

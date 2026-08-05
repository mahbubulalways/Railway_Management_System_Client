"use client";
import { useAlert } from "@/components/Alert/useAlert";
import CustomBlurLoader from "@/components/reusable/CustomBlurLoader";
import { Switch } from "@/components/ui/switch";
import { IStationWithPlatforms } from "@/interface/station";
import { useUpdateStationEntityMutation } from "@/redux/features/station.features";
import {
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

const StationEntitySection = ({
  station,
}: {
  station: IStationWithPlatforms;
}) => {
  const [updateEntityAsync, { isLoading }] = useUpdateStationEntityMutation();
  const { showAlert, showConfirm } = useAlert();
  const amenities = [
    {
      label: "Wi-Fi",
      field: "wifi",
      available: station.wifi,
      icon: Wifi,
    },
    {
      label: "Parking",
      field: "parking",
      available: station.parking,
      icon: ParkingCircle,
    },
    {
      label: "Food court",
      field: "foodCourt",
      available: station.foodCourt,
      icon: Utensils,
    },
    {
      label: "Lift",
      field: "lift",
      available: station.lift,
      icon: ArrowUpDown,
    },
    {
      label: "Escalator",
      field: "escalator",
      available: station.escalator,
      icon: ArrowUpDown,
    },
    {
      label: "Wheelchair access",
      field: "wheelchairAccess",
      available: station.wheelchairAccess,
      icon: Accessibility,
    },
    {
      label: "Washroom",
      field: "washroom",
      available: station.washroom,
      icon: ToiletIcon,
    },
    {
      label: "ATM",
      field: "atm",
      available: station.atm,
      icon: Ticket,
    },
    {
      label: "CCTV",
      field: "cctv",
      available: station.cctv,
      icon: Camera,
    },
    {
      label: "Security service",
      field: "securityService",
      available: station.securityService,
      icon: ShieldCheck,
    },
    {
      label: "Ticket counter",
      field: "ticketCounter",
      available: station.ticketCounter,
      icon: Ticket,
    },
    {
      label: "Online ticket",
      field: "onlineTicketSupport",
      available: station.onlineTicketSupport,
      icon: Globe,
    },
    {
      label: "Display board",
      field: "hasDisplayBoard",
      available: station.hasDisplayBoard,
      icon: MonitorPlay,
    },
    {
      label: "Announcement system",
      field: "hasAnnouncementSystem",
      available: station.hasAnnouncementSystem,
      icon: Speaker,
    },
    {
      label: "Prayer room",
      field: "prayerRoom",
      available: station.prayerRoom,
      icon: Sparkles,
    },
  ];

  // CHANGE ANTITY STATUS FUNC
  const handleAmenityChange = (field: string, newState: boolean) => {
    const label = field
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (str) => str.toUpperCase());

    showConfirm({
      title: `Update ${label}`,
      description: "Are you sure you want to update this amenity?",
      confirmText: "Update",
      cancelText: "Cancel",
      onConfirm: async () => {
        try {
          const payload = {
            id: station?.stationId,
            data: {
              [field]: newState,
            },
          };
          const result = await updateEntityAsync(payload).unwrap();
          showAlert({
            title: "Success",
            type: "success",
            autoClose: 2000,
            description: result.message,
          });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          showAlert({
            title: "Error",
            type: "error",
            description:
              error?.data?.message || error?.error || "Something went wrong",
          });
        }
      },
    });
  };

  return (
    <>
      <div className="my-12">
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Amenities */}
          <div className="lg:col-span-2">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Amenities
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {amenities.map(({ label, available, field, icon: Icon }) => (
                <div
                  key={label}
                  className={`flex items-center gap-3 rounded-2xl border px-3 py-3 text-sm transition ${
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

                  <div className="flex flex-1 items-center justify-between">
                    <span className="font-medium">{label}</span>

                    <Switch
                      checked={available}
                      onCheckedChange={(checked) =>
                        handleAmenityChange(field, checked)
                      }
                      className="data-[state=checked]:bg-[#006A4E] cursor-pointer"
                    />
                  </div>
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
                    <p className="font-semibold text-gray-800">
                      {platform.name}
                    </p>
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
            </div>
          </div>
        </div>
      </div>
      {isLoading && <CustomBlurLoader />}
    </>
  );
};

export default StationEntitySection;

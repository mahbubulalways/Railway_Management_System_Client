"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Gauge, TrainFront, Users } from "lucide-react";

import CustomLoader from "@/components/reusable/CustomLoader";
import CustomStatus from "@/components/reusable/CustomStatus";
import { ITrain } from "@/interface/train";
import { useGetSingleTrainQuery } from "@/redux/features/train.features";

const TrainDetailsPage = ({ id }: { id: string }) => {
  const { isLoading, isError, data } = useGetSingleTrainQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const train = data?.data as ITrain;

  if (isLoading) return <CustomLoader />;
  if (isError) return <CustomStatus type="error" />;
  if (!train) return <CustomStatus type="empty" />;

  const totalSeats =
    train.coaches?.reduce(
      (acc, item) => acc + (item.coach?._count?.seats || 0),
      0,
    ) || 0;

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow">
        <div className="bg-linear-to-br from-[#006A4E] to-[#00432F] p-8 text-white">
          <h1 className="text-4xl font-bold">{train.name}</h1>
          <p className="mt-2 text-lg opacity-90">{train.trainId}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <span className="rounded-full bg-white/20 px-4 py-1 text-sm">
              {train.type}
            </span>
            <span className="rounded-full bg-green-600 px-4 py-1 text-sm">
              {train.status}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 divide-x divide-gray-100 border-t border-gray-100 sm:grid-cols-4">
          <div className="py-2 flex flex-col items-center">
            <h1 className="font-semibold uppercase">Coaches</h1>{" "}
            <h2 className="text-xl ">{train.coaches.length}</h2>
          </div>
          <div className="py-2 flex flex-col items-center">
            <h1 className="font-semibold uppercase">Total Seats</h1>
            <h2 className="text-xl ">{totalSeats}</h2>
          </div>
          <div className="py-2 flex flex-col items-center">
            <h1 className="font-semibold uppercase">Max Speed</h1>{" "}
            <h2 className="text-xl ">{train.maxSpeed} km/h</h2>
          </div>
          <div className="py-2 flex flex-col items-center">
            <h1 className="font-semibold uppercase">Manufacture</h1>
            <h2 className="text-xl ">{train.manufactureYear}</h2>
          </div>
        </div>
      </div>

      {train.notes && (
        <div className="rounded-xl shadow bg-white p-6">
          <h2 className="mb-3 text-xl font-semibold">Notes</h2>

          <p className="text-gray-600">{train.notes}</p>
        </div>
      )}

      {/* Coach Table */}
      <div className="rounded-xl p-6  bg-white">
        <h2 className="text-xl font-semibold mb-3">Attached Coaches</h2>
        <p className=" text-gray-600">
          {train.coaches.length} Coaches Attached
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {train?.coaches?.map((item) => (
          <Link
            key={item.id}
            href={`/dashboard/admin/coaches/${item.coach.id}`}
            className="group"
          >
            <div className="rounded-xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1  shadow">
              {/* Top */}
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#006A4E] text-sm font-bold text-white">
                  {item.coach.coachNumber}
                </div>

                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600">
                  #{item.sequence}
                </span>
              </div>

              {/* Info */}
              <div className="mt-3">
                <h3 className="text-sm font-semibold">
                  Coach {item.coach.coachNumber}
                </h3>

                <p className="truncate text-xs text-gray-500">
                  {item.coach.coachCode}
                </p>
              </div>

              {/* Type */}
              <div className="mt-3">
                <span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] font-medium text-blue-700">
                  {item.coach.coachModel?.type?.replaceAll("_", " ") ?? "N/A"}
                </span>
              </div>

              {/* Bottom */}
              <div className="mt-4 flex items-center justify-between border-t pt-3 border-gray-200">
                <div>
                  <p className="text-[10px] uppercase text-gray-400">Seats</p>
                  <p className="text-sm font-bold">
                    {item.coach._count?.seats ?? 0}
                  </p>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#006A4E]/10 transition group-hover:bg-[#006A4E]">
                  <ArrowRight className="h-4 w-4 text-[#006A4E]   group-hover:text-white" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrainDetailsPage;

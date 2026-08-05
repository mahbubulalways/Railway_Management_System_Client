"use client";

import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { TStaffResponse } from "@/interface/staff";

type Props = {
  staff: TStaffResponse;
};

const StaffHeader = ({ staff }: Props) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      {/* Background */}
      <div className="bg-linear-to-br from-[#006A4E] via-[#005940] to-[#00432F] p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}
          <div className="flex items-center gap-6">
            <div className="relative h-28 w-28 overflow-hidden rounded-2xl border-4 border-white/20 bg-white/10">
              <Image
                src={staff.avatar!}
                alt={staff.name}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h1 className="mt-1 text-3xl font-bold text-white">
                {staff.name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-white/10 px-3 py-1  text-white">
                  {staff.staffId}
                </span>

                <span className="rounded-full bg-emerald-500/20 px-3 py-1  text-emerald-200">
                  {staff.staffType.type}
                </span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col items-end gap-3">
            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                staff.user.status === "ACTIVE"
                  ? "bg-emerald-400/20 text-emerald-200"
                  : "bg-red-400/20 text-red-200"
              }`}
            >
              {staff.user.status}
            </span>

            {staff.user.isVerified ? (
              <span className="flex items-center gap-2 rounded-full bg-blue-400/20 px-4 py-2 text-sm text-blue-100">
                <BadgeCheck size={16} />
                Verified
              </span>
            ) : (
              <span className="rounded-full bg-red-400/20 px-4 py-2 text-sm text-red-200">
                Not Verified
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffHeader;

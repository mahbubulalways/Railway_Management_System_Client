"use client";

import Image from "next/image";
import moment from "moment";
import {
  Mail,
  Phone,
  MapPin,
  Clock3,
  CalendarDays,
  BadgeDollarSign,
  BriefcaseBusiness,
} from "lucide-react";

import CustomLoader from "@/components/reusable/CustomLoader";
import CustomStatus from "@/components/reusable/CustomStatus";
import { TStaffResponse } from "@/interface/staff";
import { useGetStaffOfAStationQuery } from "@/redux/features/staff.features";
import { USER_STATUS } from "@/interface/user";
import Link from "next/link";

const ManageStaffPage = () => {
  const { isError, isLoading, data } = useGetStaffOfAStationQuery(undefined);

  if (isLoading) {
    return <CustomLoader />;
  }

  if (isError) {
    return (
      <CustomStatus
        type="error"
        title="Error"
        description="Something went wrong"
      />
    );
  }

  const staffs = data?.data as TStaffResponse[];

  if (!staffs?.length) {
    return (
      <CustomStatus
        type="error"
        title="No Staff"
        description="No staff found for this station."
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Station Staff</h1>
        <p className="mt-1 ">Total Staff: {staffs.length}</p>
      </div>

      {/* Staff Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {staffs.map((staff) => (
          <div
            key={staff.id}
            className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#006A4E]/20 hover:shadow-xl"
          >
            {/* Top */}
            <div className="bg-linear-to-r from-[#006A4E]/5 via-white to-[#006A4E]/5 p-5">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <Image
                    src={staff.avatar!}
                    alt={staff.name}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-2xl object-cover ring-2 ring-[#006A4E]/10"
                  />

                  <span
                    className={`absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white ${
                      staff.user.status === USER_STATUS.ACTIVE
                        ? "bg-emerald-500"
                        : "bg-red-500"
                    }`}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-lg font-semibold text-gray-900">
                    {staff.name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {staff.staffType?.type}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#006A4E]/10 px-3 py-1 text-xs font-medium text-[#006A4E]">
                      {staff.staffId}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        staff.user.status === USER_STATUS.ACTIVE
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {staff.user.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4 p-5">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#006A4E]" />
                <div>
                  <p className="text-xs text-gray-400">Phone</p>
                  <p className="font-medium">{staff.user.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#006A4E]" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="truncate font-medium">{staff.user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[#006A4E]" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-400">Address</p>
                  <p className="truncate font-medium">{staff.address}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="rounded-2xl bg-gray-50 p-3">
                  <div className="flex items-center gap-2 text-[#006A4E]">
                    <CalendarDays size={16} />
                    <span className="text-xs">Joined</span>
                  </div>

                  <p className="mt-2 text-sm font-semibold">
                    {moment(staff.joiningDate).format("DD MMM YYYY")}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-3">
                  <div className="flex items-center gap-2 text-[#006A4E]">
                    <BriefcaseBusiness size={16} />
                    <span className="text-xs">Shift</span>
                  </div>

                  <p className="mt-2 text-sm font-semibold">{staff.shift}</p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-3">
                  <div className="flex items-center gap-2 text-[#006A4E]">
                    <Clock3 size={16} />
                    <span className="text-xs">Duty</span>
                  </div>

                  <p className="mt-2 text-sm font-semibold">
                    {staff.dutyStartTime} - {staff.dutyEndTime}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-3">
                  <div className="flex items-center gap-2 text-[#006A4E]">
                    <BadgeDollarSign size={16} />
                    <span className="text-xs">Salary</span>
                  </div>

                  <p className="mt-2 text-sm font-semibold">
                    ৳ {staff.salary.toLocaleString()}
                  </p>
                </div>
              </div>

              <Link href={`manage-staff/${staff.staffId}`}>
                <button className="mt-2 w-full rounded-xl bg-[#006A4E] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#00553e]">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageStaffPage;

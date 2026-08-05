import { ActionButton } from "@/components/reusable/ActionButton";
import { TStaffResponse } from "@/interface/staff";
import { USER_STATUS } from "@/interface/user";
import { Calendar, Mail, Phone, Users } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

const StationStaffSection = ({ staffs }: { staffs: TStaffResponse[] }) => {
  return (
    <div className="mt-8">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Station Staff</h2>
          <p className="text-sm text-gray-500">
            {staffs.length} staff assigned to this station
          </p>
        </div>

        <div className="rounded-xl bg-[#006A4E]/10 px-4 py-2">
          <p className="text-xs text-gray-500">Total Staff</p>
          <p className="text-lg font-bold text-[#006A4E]">{staffs.length}</p>
        </div>
      </div>
      {staffs?.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {staffs.map((staff) => (
            <div
              key={staff.id}
              className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#006A4E]/20 hover:shadow-xl"
            >
              {/* Header */}
              <div className="bg-linear-to-r from-[#006A4E]/5 via-white to-[#006A4E]/5 p-5">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Image
                      width={80}
                      height={80}
                      src={staff.avatar as string}
                      alt={staff.name}
                      className="h-18 w-18 rounded-2xl object-cover ring-2 ring-[#006A4E]/10"
                    />

                    <span
                      className={`absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-white ${
                        staff.user.status === USER_STATUS.ACTIVE
                          ? "bg-emerald-500"
                          : "bg-red-500"
                      }`}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-lg font-semibold text-gray-900">
                      {staff.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
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

                  <ActionButton
                    buttons={[
                      { id: 3, title: "Send Email", onClick: () => {} },
                      { id: 4, title: "Update salary", onClick: () => {} },
                      { id: 1, title: "Update phone", onClick: () => {} },
                      { id: 2, title: "Update Email", onClick: () => {} },
                    ]}
                  />
                </div>
              </div>

              {/* Body */}
              <div className="space-y-4 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006A4E]/10">
                    <Phone size={18} className="text-[#006A4E]" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Phone</p>
                    <p className="font-medium text-gray-800">
                      {staff.user.phone || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006A4E]/10">
                    <Mail size={18} className="text-[#006A4E]" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="truncate font-medium text-gray-800">
                      {staff.user.email || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#006A4E]/10">
                    <Calendar size={18} className="text-[#006A4E]" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Joined</p>
                    <p className="font-medium text-gray-800">
                      {staff.joiningDate
                        ? moment(staff.joiningDate).format("DD MMM YYYY")
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-100 p-5 pt-4">
                <Link
                  href={`/dashboard/staff/view-station/staff-details/${staff.staffId}`}
                  className="w-full rounded-xl px-4 py-2.5 font-medium bg-[#006A4E] text-white"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-52 flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-gray-50">
          <Users className="mb-3 h-10 w-10 text-gray-300" />
          <p className="font-medium text-gray-500">No staff assigned yet</p>
          <p className="mt-1 text-sm text-gray-400">
            Staff will appear here after assignment.
          </p>
        </div>
      )}
    </div>
  );
};

export default StationStaffSection;

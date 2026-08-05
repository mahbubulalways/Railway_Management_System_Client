"use client";

import { TStaffResponse } from "@/interface/staff";
import { BadgeDollarSign, CalendarDays, Clock3, User } from "lucide-react";
import moment from "moment";

type Props = {
  staff: TStaffResponse;
};

const StaffStats = ({ staff }: Props) => {
  const stats = [
    {
      title: "Monthly Salary",
      value: `৳ ${staff.salary.toLocaleString()}`,
      icon: BadgeDollarSign,
    },
    {
      title: "Shift",
      value: staff.shift,
      icon: Clock3,
    },

    {
      title: "Joining Date",
      value: moment(staff.joiningDate).format("DD MMM YYYY"),
      icon: CalendarDays,
    },
    {
      title: "Role",
      value: staff.user.role,
      icon: User,
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="group rounded-3xl border border-gray-100 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#006A4E]/20 hover:shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  {item.title}
                </p>

                <h3 className="mt-3 text-xl font-bold text-gray-900">
                  {item.value}
                </h3>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#006A4E]/10 transition-all duration-300 group-hover:bg-[#006A4E]">
                <Icon
                  size={22}
                  className="text-[#006A4E] transition-all duration-300 group-hover:text-white"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StaffStats;

"use client";

import { ActionButton } from "@/components/reusable/ActionButton";
import { TStaffResponse } from "@/interface/staff";

import {
  Building2,
  CalendarDays,
  Clock3,
  BriefcaseBusiness,
  MapPinned,
  Timer,
} from "lucide-react";
import moment from "moment";
import Link from "next/link";

type Props = {
  staff: TStaffResponse;
  condition: boolean;
};

const EmploymentInformation = ({ staff, condition }: Props) => {
  const items = [
    {
      label: "Staff Type",
      value: staff.staffType?.type,
      icon: BriefcaseBusiness,
    },
    {
      label: "Station",
      value: staff.station?.name,
      icon: Building2,
    },
    {
      label: "Station ID",
      value: staff.station?.stationId,
      icon: MapPinned,
    },
    {
      label: "Shift",
      value: staff.shift,
      icon: Clock3,
    },
    {
      label: "Duty Start",
      value: staff.dutyStartTime,
      icon: Timer,
    },
    {
      label: "Duty End",
      value: staff.dutyEndTime,
      icon: Timer,
    },
    {
      label: "Joining Date",
      value: moment(staff.joiningDate).format("DD MMM YYYY"),
      icon: CalendarDays,
    },
    {
      label: "Resignation Date",
      value: staff.resignationDate
        ? moment(staff.resignationDate).format("DD MMM YYYY")
        : "Still Working",
      icon: CalendarDays,
    },
  ];

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      <div className="flex justify-between items-start">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Employment Information
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Staff employment details and duty schedule.
          </p>
        </div>
        {condition ? (
          <ActionButton
            buttons={[
              {
                id: 1,
                title: "Update Shift",
                onClick: () => {},
              },
              {
                id: 11,
                title: "Update Time",
                onClick: () => {},
              },
              {
                id: 111,
                title: "Update Resignation",
                onClick: () => {},
              },
              {
                id: 1111,
                title: "Update Joining Date",
                onClick: () => {},
              },
            ]}
          />
        ) : (
          ""
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="group flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4 transition-all duration-300 hover:border-[#006A4E]/20 hover:bg-[#006A4E]/5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#006A4E]/10 transition group-hover:bg-[#006A4E]">
                <Icon
                  size={20}
                  className="text-[#006A4E] transition group-hover:text-white"
                />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  {item.label}
                </p>

                {item.label === "Station" ? (
                  <Link
                    href={`/dashboard/admin/stations/details/${staff.station.stationId}`}
                    className="mt-1 inline-block font-semibold text-[#006A4E] transition hover:text-[#00432F] hover:underline"
                  >
                    {item.value}
                  </Link>
                ) : (
                  <p className="mt-1  font-semibold text-gray-900">
                    {item.value}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmploymentInformation;

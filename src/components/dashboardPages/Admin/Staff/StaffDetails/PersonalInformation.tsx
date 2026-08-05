"use client";

import { TStaffResponse } from "@/interface/staff";
import { Mail, MapPin, Phone, User, BadgeInfo } from "lucide-react";
import { GrStatusUnknown } from "react-icons/gr";

type Props = {
  staff: TStaffResponse;
};

const info = [
  {
    key: "name",
    label: "Full Name",
    icon: User,
  },
  {
    key: "email",
    label: "Email Address",
    icon: Mail,
  },
  {
    key: "phone",
    label: "Phone Number",
    icon: Phone,
  },
  {
    key: "address",
    label: "Address",
    icon: MapPin,
  },
  {
    key: "staffId",
    label: "Staff ID",
    icon: BadgeInfo,
  },
  {
    key: "status",
    label: "Status",
    icon: GrStatusUnknown,
  },
];

const PersonalInformation = ({ staff }: Props) => {
  const values = {
    name: staff.name,
    email: staff.user.email,
    phone: staff.user.phone,
    address: staff.address || "Not Provided",
    staffId: staff.staffId,
    status: staff.user.status,
  };

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Personal Information
        </h2>

        <p className="mt-1  text-gray-500">
          Personal details of this staff member.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {info.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.key}
              className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4 transition-all duration-300 hover:border-[#006A4E]/20 hover:bg-[#006A4E]/5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#006A4E]/10">
                <Icon size={20} className="text-[#006A4E]" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  {item.label}
                </p>

                <p className="mt-1   font-semibold text-gray-900">
                  {values[item.key as keyof typeof values]}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PersonalInformation;

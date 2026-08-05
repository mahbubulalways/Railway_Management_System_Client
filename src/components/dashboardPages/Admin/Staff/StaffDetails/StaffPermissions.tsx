"use client";

import { TStaffResponse } from "@/interface/staff";
import { IStaffPermission } from "@/interface/staff-type";
import { CheckCircle2, ShieldCheck } from "lucide-react";

type Props = {
  staff: TStaffResponse;
};

const StaffPermissions = ({ staff }: Props) => {
  const permissions = staff.staffType?.staffPermissions ?? [];

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#006A4E]/10">
          <ShieldCheck className="text-[#006A4E]" size={22} />
        </div>

        <div>
          <h2 className="text-lg font-semibold">Permissions</h2>

          <p className="text-sm text-gray-500">
            Total {permissions.length} assigned permissions
          </p>
        </div>
      </div>

      {permissions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 py-8 text-center text-sm text-gray-400">
          No permissions assigned
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {permissions.map((permission: IStaffPermission) => (
            <div
              key={permission.permission.id}
              className="flex items-center gap-3 rounded-2xl border border-[#006A4E]/10 bg-[#006A4E]/5 p-4 transition hover:border-[#006A4E]/30 hover:bg-[#006A4E]/10"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#006A4E]">
                <CheckCircle2 size={18} className="text-white" />
              </div>

              <div className="min-w-0">
                <p className="truncate font-medium text-gray-900">
                  {permission.permission?.permission}
                </p>

                <p className="text-xs text-gray-500">Permission</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StaffPermissions;

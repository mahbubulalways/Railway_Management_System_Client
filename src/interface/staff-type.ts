import { IPermission } from "./permission";

interface StaffPermission {
  permission: IPermission;
}

export interface IStaffType {
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  staffPermissions: StaffPermission[];
}

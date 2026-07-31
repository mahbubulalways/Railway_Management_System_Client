import { IPermission } from "./permission";

export interface IStaffPermission {
  permission: IPermission;
}

export interface IStaffType {
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  staffPermissions: IStaffPermission[];
}

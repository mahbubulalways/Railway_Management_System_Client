import { IStaffType } from "./staff-type";
import { IStationWithPlatforms } from "./station";
import { TUser } from "./user";

export const SHIFT_TYPE_OPTIONS = [
  {
    label: "Morning",
    value: "MORNING",
  },
  {
    label: "Evening",
    value: "EVENING",
  },
  {
    label: "Night",
    value: "NIGHT",
  },
];

// CREATE STAFF
export type TCreateeStaff = {
  data: {
    password: string;
    data: {
      name: string;
      email: string;
      phone: string;
      staffTypeId: string;
      stationId: string;
      shift: string;
      salary: number;
      joiningDate: Date;
      dutyStartTime: string;
      dutyEndTime: string;
      address: string;
    };
  };
};

// STAFF RESPONSE FROM SERVER
export enum StaffType {
  STATION_MASTER = "STATION_MASTER",
  ASSISTANT_STATION_MASTER = "ASSISTANT_STATION_MASTER",
  TICKET_CLERK = "TICKET_CLERK",
  BOOKING_ASSISTANT = "BOOKING_ASSISTANT",
  TRAIN_GUARD = "TRAIN_GUARD",
  TRAIN_DRIVER = "TRAIN_DRIVER",
  SIGNAL_OPERATOR = "SIGNAL_OPERATOR",
  POINTSMAN = "POINTSMAN",
  PLATFORM_SUPERVISOR = "PLATFORM_SUPERVISOR",
  STATION_CONTROLLER = "STATION_CONTROLLER",
  SECURITY_GUARD = "SECURITY_GUARD",
  MAINTENANCE_ENGINEER = "MAINTENANCE_ENGINEER",
  ELECTRICIAN = "ELECTRICIAN",
  TRACK_MAINTAINER = "TRACK_MAINTAINER",
  CLEANER = "CLEANER",
  OFFICE_ASSISTANT = "OFFICE_ASSISTANT",
  ACCOUNT_OFFICER = "ACCOUNT_OFFICER",
  HR_OFFICER = "HR_OFFICER",
  IT_SUPPORT = "IT_SUPPORT",
  CUSTOMER_SERVICE_OFFICER = "CUSTOMER_SERVICE_OFFICER",
}

export enum ShiftType {
  MORNING = "MORNING",
  EVENING = "EVENING",
  NIGHT = "NIGHT",
}

export type TStaffResponse = {
  id: string;
  staffId: string;
  user: TUser;
  staffTypeId: string;
  staffType: IStaffType;
  name: string;
  avatar?: string | null;
  salary: number;
  shift: ShiftType;
  dutyStartTime?: string | null;
  dutyEndTime?: string | null;
  resignationDate?: Date | null;
  address?: string | null;
  joiningDate: Date;
  stationId: string;
  station: IStationWithPlatforms;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

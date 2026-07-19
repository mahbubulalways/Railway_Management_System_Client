import { IRouteResponse } from "./route";
import { ITrain } from "./train";

export interface ICreateSchedule {
  data: {
    trainId: string;
    routeId: string;
    direction: "UP" | "DOWN";
    name?: string;
    startTime: string;
    runningDays: string[];
    bookingOpenDays: number;
    validFrom: string;
    validUntil?: string | null;
  };
}

// RESPONSE
export type RunningDay =
  | "SATURDAY"
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY";

export type ScheduleDirection = "UP" | "DOWN";

export type TripInstanceStatus =
  | "SCHEDULED"
  | "CANCELLED"
  | "COMPLETED"
  | "DELAYED"
  | "RUNNING";

export interface ITripInstance {
  id: string;
  scheduleId: string;
  journeyDate: string;
  status: TripInstanceStatus;
  remarks: string | null;
  totalSeats: number;
  availableSeats: number;
  createdAt: string;
  updatedAt: string;
}

export interface IScheduleResponse {
  id: string;
  name: string;
  trainId: string;
  routeId: string;
  direction: ScheduleDirection;
  startTime: string;
  runningDays: RunningDay[];
  bookingOpenDays: number;
  isActive: boolean;
  validFrom: string;
  validUntil: string;
  tripInstances: ITripInstance[];
  route: IRouteResponse;
  train: ITrain;
  createdAt: string;
  updatedAt: string;
}

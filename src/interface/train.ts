import { ICoach } from "./coach";
import { IScheduleResponse } from "./schedule";

export interface ITrain {
  id: string;
  trainId: string;
  name: string;
  type:
    | "INTERCITY"
    | "MAIL"
    | "EXPRESS"
    | "LOCAL"
    | "COMMUTER"
    | "SPECIAL"
    | "GOODS";
  status: string;
  maxSpeed: number | null;
  manufactureYear: number | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  coaches: ITrainCoach[];
  schedules: IScheduleResponse[];
  _count: {
    coaches: number;
  };
}

export interface ICreateTrain {
  data: {
    name: string;
    type:
      | "INTERCITY"
      | "MAIL"
      | "EXPRESS"
      | "LOCAL"
      | "COMMUTER"
      | "SPECIAL"
      | "GOODS";
    status: string;
    maxSpeed?: number | null;
    manufactureYear?: number | null;
    notes?: string | null;
  };
}

interface ITrainCoach {
  id: string;
  trainId: string;
  coachId: string;
  sequence: number;
  coach: ICoach;
}

import { ICoachModel, TSeatSide, TSeatType } from "./coach-model";

export interface ISeat {
  id: string;
  coachId: string;
  label: number;
  row: number;
  position: number;
  side: TSeatSide;
  seatType: TSeatType;
  createdAt: string;
}

export interface ICoach {
  id: string;

  coachCode: string;
  coachNumber: string;

  coachModelId: string;

  coachModel: ICoachModel;
  status: "AVAILABLE" | "ASSIGNED" | "MAINTENANCE";
  seats: ISeat[];
  _count: { seats: number };
  createdAt: string;
}

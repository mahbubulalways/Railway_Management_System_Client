export type TSeatSide = "LEFT" | "RIGHT";

export type TSeatType = "WINDOW" | "AISLE" | "MIDDLE";

export interface ICoachModelSeat {
  id: string;
  coachModelId: string;
  label: number;
  row: number;
  side: TSeatSide;
  position: number;
  seatType: TSeatType;
  createdAt: string;
}

export interface ICoachModel {
  id: string;
  name: string;
  type: string;
  layoutType: string;
  description: string | null;
  totalSeats: number;
  createdAt: string;
  updatedAt: string;

  seats: ICoachModelSeat[];
  coaches: [];
}

// CREATION DATA
export type TCoachModelLayout = {
  leftSeats: number;
  rightSeats: number;
};

export type TCreateCoachModel = {
  data: {
    name: string;
    type: string;
    totalSeats: number;
    layout: TCoachModelLayout[];
  };
};

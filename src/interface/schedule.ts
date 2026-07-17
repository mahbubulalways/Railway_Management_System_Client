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

export type IPlatform = {
  stationId: string;
  id: string;
  name: string;
  type: string;
  status: string;
  length: number;
  capacity: number;
  hasRoof: boolean;
};

export type IStation = {
  id: string;
  stationId: string;
  phone: string;
  email: string;

  type: string;
  division: string;
  district: string;
  name: string;

  status: string;
  established: Date;
  notes: string;

  ticketCounter: boolean;
  onlineTicketSupport: boolean;
  foodCourt: boolean;
  parking: boolean;
  hasDisplayBoard: boolean;
  hasAnnouncementSystem: boolean;
  wheelchairAccess: boolean;
  wifi: boolean;
  washroom: boolean;
  atm: boolean;
  securityService: boolean;
  cctv: boolean;
  prayerRoom: boolean;
  escalator: boolean;
  lift: boolean;
  createdAt: string;
};

export type IStationWithPlatforms = {
  platforms: IPlatform[];
} & IStation;

export type TCreateStation = {
  data: {
    station: IStation;
    platforms: IPlatform[];
  };
};

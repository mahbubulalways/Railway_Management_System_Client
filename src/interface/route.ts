import { IStation } from "./station";

export interface IRouteStation {
  stationId: string;
  distanceFromPrevious: number;
  travelTimeFromPrevious: number;
  platform: string;
  stopTime: number;

  // Those are no need to send backend
  id: string;
  station: IStation;
  isMajorStop: boolean;
  sequence: number;
  distanceFromStart: number;

  //not db attribute those are just calculation from server
  arrivalTime: string;
  departureTime: string;
}
export interface ICreateRoute {
  data: {
    name: string;
    sourceStationId: string;
    destinationStationId: string;
    routeStations: IRouteStation[];
  };
}

export interface IRouteResponse {
  name: string;
  id: string;
  sourceStationId: string;
  destinationStationId: string;
  distance: number;
  destinationStation: IStation;
  sourceStation: IStation;
  createdAt: string;
  routeStations: IRouteStation[];
  _count: { routeStations: number };
}

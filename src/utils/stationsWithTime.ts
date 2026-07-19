import moment from "moment";

interface RouteStation {
  id: string;
  sequence: number;
  travelTimeFromPrevious: number;
  stopTime: number;
  [key: string]: any;
}

export const calculateStationTimes = (
  startTime: string,
  routeStations: RouteStation[],
) => {
  let departure = moment(startTime, "hh:mm A");

  return routeStations.map((station, index) => {
    const arrival =
      index === 0
        ? departure.clone()
        : departure.clone().add(station.travelTimeFromPrevious, "minutes");

    departure = arrival.clone().add(station.stopTime, "minutes");

    return {
      ...station,
      arrivalTime: arrival.format("hh:mm A"),
      departureTime:
        index === routeStations.length - 1 ? "--" : departure.format("hh:mm A"),
    };
  });
};

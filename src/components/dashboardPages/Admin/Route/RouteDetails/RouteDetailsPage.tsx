"use client";

import { ArrowRight } from "lucide-react";
import { useGetSingleRouteQuery } from "@/redux/features/route.feature";
import { IRouteResponse, IRouteStation } from "@/interface/route";
import ShowRouteStations from "./ShowRouteStations";
import CustomLoader from "@/components/reusable/CustomLoader";
import CustomStatus from "@/components/reusable/CustomStatus";

const RouteDetailsPage = ({ id }: { id: string }) => {
  const { data, isLoading, isError } = useGetSingleRouteQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <CustomLoader />;
  }

  if (isError) {
    return <CustomStatus type="error" />;
  }

  if (!data?.data) {
    return <CustomStatus type="empty" />;
  }

  const route = data.data as IRouteResponse;
  const totalTime =
    route?.routeStations?.reduce(
      (acc: number, curr: IRouteStation) =>
        acc + curr?.travelTimeFromPrevious + curr.stopTime,
      0,
    ) ?? 0;
  const convertToHour = totalTime / 60;

  return (
    <div>
      <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow">
        <div className="bg-linear-to-br from-[#006A4E] to-[#00432F] px-6 py-7 sm:px-8">
          <div className="flex flex-wrap items-start justify-center gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/60 text-center">
                Route Information
              </p>
              <h1 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
                {route.name}
                <br />
              </h1>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-white">
            <div>
              <h2 className="text-xl font-semibold">
                {route.sourceStation.name}
              </h2>
              <p className="mt-1 text-sm ">{route.sourceStationId}</p>
            </div>
            <ArrowRight />
            <div>
              <h2 className="text-xl font-semibold">
                {route.destinationStation.name}
              </h2>
              <p className="mt-1 text-sm ">{route.destinationStationId}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 divide-x divide-gray-100 border-t border-gray-100 sm:grid-cols-4">
          <div className="py-2 flex flex-col items-center">
            <h1 className="font-semibold uppercase">Distance</h1>
            <div className="flex items-end px-5">
              <span className="text-2xl"> {route.distance}</span>
              <span className="font-normal">KM</span>
            </div>
          </div>

          <div className="py-2 flex flex-col items-center">
            <h1 className="font-semibold uppercase">Time</h1>
            <div className="flex items-center px-5">
              <span className="text-2xl"> {convertToHour.toFixed(1)}h</span>
            </div>
          </div>

          <div className="py-2 flex flex-col items-center">
            <h1 className="font-semibold uppercase">Stations</h1>
            <div className="flex items-center px-5">
              <span className="text-2xl">
                {route.routeStations.length > 10
                  ? route.routeStations.length
                  : `0${route.routeStations.length}`}
              </span>
            </div>
          </div>

          <div className="py-2 flex flex-col items-center">
            <h1 className="font-semibold uppercase">Status</h1>
            <span className="text-xl px-5">Active</span>
          </div>
        </div>
      </div>
      <ShowRouteStations routeStations={route?.routeStations} />
    </div>
  );
};

export default RouteDetailsPage;

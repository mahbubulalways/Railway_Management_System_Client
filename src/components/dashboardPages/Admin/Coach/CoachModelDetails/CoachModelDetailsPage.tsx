"use client";

import { useMemo } from "react";
import { useGetSingleCoachModelQuery } from "@/redux/features/coach-model.feature";
import { ICoachModel, ICoachModelSeat } from "@/interface/coach-model";
import CustomLoader from "@/components/reusable/CustomLoader";
import CustomStatus from "@/components/reusable/CustomStatus";

const CoachModelDetailsPage = ({ id }: { id: string }) => {
  const { data, isLoading, isError } = useGetSingleCoachModelQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const coachModel = data?.data as ICoachModel | undefined;

  const rows = useMemo<ICoachModelSeat[][]>(() => {
    if (!coachModel?.seats) return [];

    const grouped = coachModel.seats.reduce<Record<number, ICoachModelSeat[]>>(
      (acc, seat) => {
        if (!acc[seat.row]) {
          acc[seat.row] = [];
        }

        acc[seat.row].push(seat);

        return acc;
      },
      {},
    );

    return Object.values(grouped).map((row) =>
      row.sort((a, b) => a.position - b.position),
    );
  }, [coachModel]);

  if (isLoading) {
    return <CustomLoader />;
  }

  if (isError || !coachModel) {
    return <CustomStatus type="error" />;
  }

  const getSeatColor = (type: ICoachModelSeat["seatType"]): string => {
    switch (type) {
      case "WINDOW":
        return "bg-green-500";

      case "AISLE":
        return "bg-blue-500";

      default:
        return "bg-gray-500";
    }
  };

  return (
    <div>
      <div className="mb-10 bg-linear-to-br rounded-lg from-[#006A4E] to-[#00432F] px-6 py-7 sm:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-100">
              {coachModel.name}
            </h1>
            <p className="mt-1 text-sm text-gray-100">
              Coach Model Information
            </p>
          </div>

          <div className="rounded-xl bg-blue-50 px-5 py-3 text-center">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
              Total Seats
            </p>
            <p className="text-3xl font-bold text-blue-600">
              {coachModel.totalSeats}
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <div className="rounded-xl  bg-gray-50 p-4">
            <p className="text-xs font-semibold uppercase text-gray-500">
              Coach Type
            </p>
            <p className="mt-2 text-lg font-semibold text-gray-900">
              {coachModel.type.replaceAll("_", " ")}
            </p>
          </div>

          <div className="rounded-xl  bg-gray-50 p-4">
            <p className="text-xs font-semibold uppercase text-gray-500">
              Layout Type
            </p>
            <p className="mt-2 text-lg font-semibold text-gray-900">
              {coachModel.layoutType}
            </p>
          </div>

          <div className="rounded-xl  bg-gray-50 p-4">
            <p className="text-xs font-semibold uppercase text-gray-500">
              Description
            </p>
            <p className="mt-2 text-gray-700">
              {coachModel.description || "No description available"}
            </p>
          </div>

          <div className="rounded-xl  bg-gray-50 p-4">
            <p className="text-xs font-semibold uppercase text-gray-500">
              Status
            </p>

            <span className="mt-2 inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
              Active
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-8 my-10 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-500" />
          <span>Window</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-500" />
          <span>Aisle</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-500" />
          <span>Middle</span>
        </div>
      </div>

      <div className="space-y-4">
        {rows.map((row, index) => {
          const leftSeats = row.filter((seat) => seat.side === "LEFT");

          const rightSeats = row.filter((seat) => seat.side === "RIGHT");

          return (
            <div key={index} className="flex justify-center items-center gap-5">
              {/* LEFT */}
              <div className="flex gap-6 min-w-45 justify-start">
                {leftSeats.map((seat) => (
                  <div
                    key={seat.id}
                    className={`w-14 h-14 rounded-lg text-white flex items-center justify-center font-semibold shadow ${getSeatColor(
                      seat.seatType,
                    )}`}
                  >
                    {seat.label}
                  </div>
                ))}
              </div>

              {/* AISLE */}
              <div className="w-16" />

              {/* RIGHT */}
              <div className="flex gap-6 min-w-65">
                {rightSeats.map((seat) => (
                  <div
                    key={seat.id}
                    className={`w-14 h-14 rounded-lg text-white flex items-center justify-center font-semibold shadow ${getSeatColor(
                      seat.seatType,
                    )}`}
                  >
                    {seat.label}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoachModelDetailsPage;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Button from "@/components/reusable/Button";
import CustomInput from "@/components/reusable/CustomInput";
import CustomSelect from "@/components/reusable/CustomSelect";
import { ICreateRoute, IRouteStation } from "@/interface/route";
import { IPlatform, IStationWithPlatforms } from "@/interface/station";
import formatLabelValuePair from "@/utils/formatLabelValuePair";
import { Plus, Trash2 } from "lucide-react";
import {
  FieldErrors,
  useFieldArray,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

type TRouteStationsArrayProps = {
  control: any;
  register: UseFormRegister<any>;
  errors?: FieldErrors<ICreateRoute>;
  stationOptions: { label: string; value: string }[];
  isStationsLoading: boolean;
  isError: boolean;
  watch: UseFormWatch<ICreateRoute>;
  stations: IStationWithPlatforms[];
};

const defaultStation: Partial<IRouteStation> = {};

const RouteStationsArray = ({
  control,
  register,
  errors,
  stationOptions,
  isStationsLoading,
  isError,
  stations,
  watch,
}: TRouteStationsArrayProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "data.routeStations",
  });

  return (
    <div className="mt-8 ">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Route Stations
          </h2>
          <p className="text-sm text-gray-500">
            Add stations in the order the train will travel.
          </p>
        </div>

        <Button type="button" onClick={() => append(defaultStation)}>
          <Plus size={18} />
          Add Station
        </Button>
      </div>

      <div className="relative mt-10">
        {fields.map((field, index) => {
          const stationId = watch(`data.routeStations.${index}.stationId`);

          const station = stations.find((st) => st.stationId === stationId);
          const platform = formatLabelValuePair({
            data: station?.platforms as IPlatform[],
            label: "name",
            value: "name",
          });

          return (
            <div key={field.id} className="relative flex gap-5 mt-5">
              <div className="flex-1 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-500 text-lg">
                      Station {index + 1}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => append(defaultStation)}
                      className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-green-600"
                    >
                      <Plus size={18} />
                    </button>

                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Fields */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
                  <CustomSelect
                    control={control}
                    name={`data.routeStations.${index}.stationId`}
                    options={stationOptions}
                    searchable
                    label="Station"
                    placeholder="Select station"
                    rules={{
                      required: "Station is required",
                    }}
                    error={errors?.data?.routeStations?.[index]?.stationId}
                    isLoading={isStationsLoading}
                    isError={isError}
                  />

                  <CustomSelect
                    control={control}
                    name={`data.routeStations.${index}.platform`}
                    options={platform || []}
                    searchable
                    label="Platform"
                    placeholder="Select platform"
                    rules={{
                      required: "Platform is required",
                    }}
                    error={errors?.data?.routeStations?.[index]?.platform}
                    isLoading={isStationsLoading}
                    isError={isError}
                  />
                  <CustomSelect
                    control={control}
                    name={`data.routeStations.${index}.stopTime`}
                    options={[
                      { label: "0", value: 0 },
                      { label: "1", value: 1 },
                      { label: "2", value: 2 },
                      { label: "3", value: 3 },
                      { label: "5", value: 5 },
                      { label: "8", value: 8 },
                      { label: "10", value: 10 },
                      { label: "15", value: 15 },
                    ]}
                    searchable
                    label="Stop time"
                    placeholder="Select stop time"
                    rules={{
                      required: "Stop time is required",
                    }}
                    error={errors?.data?.routeStations?.[index]?.stopTime}
                    isLoading={isStationsLoading}
                    isError={isError}
                  />
                  <CustomInput
                    register={register}
                    name={`data.routeStations.${index}.distanceFromPrevious`}
                    type="number"
                    label="Distance (km)"
                    placeholder="e.g. 25"
                    rules={{
                      required: "Distance is required",
                    }}
                    error={
                      errors?.data?.routeStations?.[index]?.distanceFromPrevious
                    }
                  />

                  <CustomInput
                    register={register}
                    name={`data.routeStations.${index}.travelTimeFromPrevious`}
                    type="number"
                    label="Travel Time (min)"
                    placeholder="e.g. 30"
                    rules={{
                      required: "Travel time is required",
                    }}
                    error={
                      errors?.data?.routeStations?.[index]
                        ?.travelTimeFromPrevious
                    }
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {fields.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 py-10 text-center text-gray-500">
          No stations added yet.
        </div>
      )}
    </div>
  );
};

export default RouteStationsArray;

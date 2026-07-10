"use client";

import { useAlert } from "@/components/Alert/useAlert";
import Button from "@/components/reusable/Button";
import CustomInput from "@/components/reusable/CustomInput";
import CustomSelect from "@/components/reusable/CustomSelect";
import { ICreateRoute } from "@/interface/route";
import { useGetStationOptinsQuery } from "@/redux/features/station.features";
import formatLabelValuePair from "@/utils/formatLabelValuePair";
import { useForm, FieldValues } from "react-hook-form";
import RouteStationsArray from "./RouteStationsArray";
import { useCreateRouteMutation } from "@/redux/features/route.feature";

const CreateRoutePage = () => {
  const {
    register,
    reset,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ICreateRoute>({
    defaultValues: {},
  });

  const {
    data: stationsData,
    isLoading: isStationsLoading,
    isError,
  } = useGetStationOptinsQuery(undefined);

  const [createRouteAsync, { isLoading }] = useCreateRouteMutation();

  const { showAlert } = useAlert();

  // Station গুলোকে dropdown এর options ফরম্যাটে রূপান্তর
  const stationOptions = formatLabelValuePair({
    data: stationsData?.data,
    label: "name",
    value: "stationId",
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      data.data.distance = Number(data?.data?.distance);
      // data.data.routeStations = data.data.routeStations.map(
      //   (rs: FieldValues, index: number) => ({
      //     ...rs,
      //     sequence: index + 1,
      //     distanceFromPrevious: Number(rs.distanceFromPrevious),
      //     travelTimeFromPrevious: Number(rs.travelTimeFromPrevious),
      //     defaultStopTime: Number(rs.defaultStopTime),
      //   }),
      // );

      const result = await createRouteAsync(data).unwrap();
      if (result?.success) {
        reset();
        return showAlert({
          title: "Success",
          type: "success",
          description: result?.message,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      return showAlert({
        title: "Error",
        type: "error",
        description: error?.data?.message || "Something went wrong.",
      });
    }
  };

  return (
    <div className="space-y-8 mb-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        <div className="grid grid-cols-3 gap-5">
          <CustomInput
            name="data.name"
            register={register}
            type="text"
            error={errors.data?.name}
            label="Route name"
            placeholder="Enter route name"
            rules={{ required: "Route name is required." }}
          />
          <CustomSelect
            control={control}
            name="data.sourceStationId"
            options={stationOptions}
            label="Source station"
            error={errors.data?.sourceStationId}
            placeholder="Select a source station"
            rules={{ required: "Source station is required" }}
            searchable
            isLoading={isStationsLoading}
            isError={isError}
          />
          <CustomSelect
            control={control}
            name="data.destinationStationId"
            options={stationOptions}
            label="Destination station"
            error={errors.data?.destinationStationId}
            placeholder="Select a destination station"
            rules={{ required: "Destination station is required" }}
            searchable
            isLoading={isStationsLoading}
            isError={isError}
          />
        </div>

        {/* ===== Route Stations (Dynamic List) ===== */}
        <RouteStationsArray
          watch={watch}
          control={control}
          register={register}
          stationOptions={stationOptions}
          errors={errors}
          isStationsLoading={isStationsLoading}
          isError={isError}
          stations={stationsData?.data}
        />

        <Button
          isLoading={isLoading || isStationsLoading}
          type="submit"
          className="w-full"
        >
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateRoutePage;

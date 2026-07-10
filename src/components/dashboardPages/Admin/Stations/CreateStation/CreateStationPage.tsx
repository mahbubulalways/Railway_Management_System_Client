/* eslint-disable react-hooks/incompatible-library */
"use client";
import Button from "@/components/reusable/Button";
import CustomInput from "@/components/reusable/CustomInput";
import CustomSelect from "@/components/reusable/CustomSelect";
import CustomTextArea from "@/components/reusable/CustomTextArea";
import { TCreateStation } from "@/interface/station";
import { manageBangladesh } from "@/utils/banhladeshdivisions";
import { FieldValues, useForm } from "react-hook-form";
import PlatformsFieldArray from "./Platformsfieldarray";
import { useCreateStationMutation } from "@/redux/features/station.features";
import { useAlert } from "@/components/Alert/useAlert";
import CustomDatePicker from "@/components/reusable/CustomDatepicker";
import stationPayload from "@/modify_payload/stationPayload";

const CreateStationPage = () => {
  const [createStationAsync, { isLoading }] = useCreateStationMutation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<TCreateStation>();
  const { showAlert } = useAlert();

  const getDivision = watch("data.station.division");
  const divisionOptions = manageBangladesh.map((d) => ({
    label: d.divisionName,
    value: d.divisionName,
  }));
  // District dropdown
  const districtOptions =
    manageBangladesh
      .find((d) => d.divisionName === String(getDivision))
      ?.districts?.map((d) => ({
        label: d.district.name,
        value: d.district.name,
      })) || [];

  // SUBMIT FORM
  const onSubmit = async (data: TCreateStation) => {
    const modify = stationPayload(data);
    try {
      const result = await createStationAsync(modify).unwrap();
      if (result?.success) {
        return showAlert({
          title: "Success",
          type: "success",
          description: result?.message,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.data?.message === "ZOD_ERROR") {
        // setError("")
      }
      return showAlert({
        title: "Error",
        type: "error",
        description: error.data.message || "Something went wrong.",
      });
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white p-5 rounded-lg border border-gray-200">
          <div className="grid grid-cols-3 gap-5 pb-5 ">
            <CustomInput
              name="data.station.name"
              register={register}
              type="text"
              error={errors?.data?.station?.name}
              label="Station name"
              placeholder="Enter station name"
              rules={{ required: "Station name is required." }}
            />

            <CustomSelect
              control={control}
              name="data.station.type"
              options={[
                { label: "Station", value: "station" },
                { label: "Juntion", value: "juntion" },
              ]}
              label="Station type"
              placeholder="Enter station type"
              error={errors.data?.station?.type}
              rules={{ required: "Station type is required" }}
            />

            <CustomSelect
              name="data.station.division"
              control={control}
              options={divisionOptions}
              error={errors.data?.station?.division}
              label="Division"
              placeholder="Enter division"
              rules={{ required: "Division is required." }}
            />

            <CustomSelect
              name="data.station.district"
              control={control}
              options={districtOptions}
              error={errors.data?.station?.district}
              label="District"
              placeholder="Enter district"
              rules={{ required: "District is required." }}
            />

            <CustomInput
              name="data.station.phone"
              register={register}
              type="number"
              error={errors.data?.station?.phone}
              label="Station phone"
              placeholder="Enter phone number"
              rules={{ required: "Phone number is required." }}
            />

            <CustomInput
              name="data.station.email"
              register={register}
              type="text"
              error={errors.data?.station?.email}
              label="Station email"
              placeholder="Enter email"
              rules={{ required: "Email is required." }}
            />

            <CustomSelect
              control={control}
              name="data.station.status"
              options={[
                { label: "Active", value: "Active" },
                { label: "Inactive", value: "Inactive" },
              ]}
              label="Station status"
              placeholder="Enter station status"
              rules={{ required: "Station status is required." }}
              error={errors.data?.station?.status}
            />

            <CustomDatePicker
              rules={{ required: "rere" }}
              control={control}
              name="data.station.established"
              maxFutureDays={7}
              error={errors.data?.station?.established}
              label="Established year"
              placeholder="Enter  established year"
            />

            <CustomSelect
              control={control}
              name="data.station.ticketCounter"
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ]}
              error={errors.data?.station?.ticketCounter}
              label="Ticket counter"
              placeholder="Ticket counter"
              rules={{ required: "Ticket counter is required." }}
            />

            <CustomSelect
              control={control}
              name="data.station.onlineTicketSupport"
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ]}
              error={errors.data?.station?.onlineTicketSupport}
              label="Online ticket support"
              placeholder="Online ticket support"
              rules={{ required: "Online ticket support is required." }}
            />

            <CustomSelect
              control={control}
              name="data.station.foodCourt"
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ]}
              error={errors.data?.station?.foodCourt}
              label="Online food court"
              placeholder="Online food court"
              rules={{ required: "Online food court is required." }}
            />

            <CustomSelect
              control={control}
              name="data.station.parking"
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ]}
              error={errors.data?.station?.parking}
              label="Parking"
              placeholder="Parking"
              rules={{ required: "Parking is required." }}
            />

            <CustomSelect
              control={control}
              name="data.station.hasDisplayBoard"
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ]}
              error={errors.data?.station?.hasDisplayBoard}
              label="Display board"
              placeholder="Display board"
              rules={{ required: "Display board is required." }}
            />

            <CustomSelect
              control={control}
              name="data.station.hasAnnouncementSystem"
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ]}
              error={errors.data?.station?.hasAnnouncementSystem}
              label="Announcement system"
              placeholder="Announcement system"
              rules={{ required: "Announcement system is required." }}
            />

            <CustomSelect
              control={control}
              name="data.station.wheelchairAccess"
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ]}
              error={errors.data?.station?.wheelchairAccess}
              label="Wheelchair access"
              placeholder="Wheelchair access"
              rules={{ required: "Wheelchair access is required." }}
            />

            <CustomSelect
              control={control}
              name="data.station.wifi"
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ]}
              error={errors.data?.station?.wifi}
              label="Wifi"
              placeholder="Wifi"
              rules={{ required: "Wifi is required." }}
            />

            <CustomSelect
              control={control}
              name="data.station.washroom"
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ]}
              error={errors.data?.station?.washroom}
              label="Washroom"
              placeholder="Washroom"
              rules={{ required: "Washroom is required." }}
            />

            <CustomSelect
              control={control}
              name="data.station.atm"
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ]}
              error={errors.data?.station?.atm}
              label="ATM"
              placeholder="ATM"
              rules={{ required: "ATM is required." }}
            />

            <CustomSelect
              control={control}
              name="data.station.securityService"
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ]}
              error={errors.data?.station?.securityService}
              label="Security service"
              placeholder="Security service"
              rules={{ required: "Security service is required." }}
            />

            <CustomSelect
              control={control}
              name="data.station.cctv"
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ]}
              error={errors.data?.station?.cctv}
              label="CCTV"
              placeholder="CCTV"
              rules={{ required: "CCTV is required." }}
            />

            <CustomSelect
              control={control}
              name="data.station.prayerRoom"
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ]}
              error={errors.data?.station?.prayerRoom}
              label="Prayer room"
              placeholder="Prayer room"
              rules={{ required: "Prayer room is required." }}
            />

            <CustomSelect
              control={control}
              name="data.station.escalator"
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ]}
              error={errors.data?.station?.escalator}
              label="Escalator"
              placeholder="Escalator"
              rules={{ required: "Escalator is required." }}
            />

            <CustomSelect
              control={control}
              name="data.station.lift"
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ]}
              error={errors.data?.station?.lift}
              label="Lift"
              placeholder="Lift"
              rules={{ required: "Lift is required." }}
            />
          </div>

          <CustomTextArea
            control={control}
            name="data.station.notes"
            error={errors.data?.station?.notes}
            label="Notes"
            placeholder="Write about station..."
            maxLength={200}
            rows={3}
            rules={{ required: "Notes is required" }}
          />
        </div>

        {/* PLATFORM */}
        <PlatformsFieldArray
          control={control}
          register={register}
          errors={errors}
          name="data.platforms"
        />
        <div className="grid grid-cols-2 gap-5 mt-5">
          <Button
            type="button"
            onClick={() => reset()}
            className="w-full  bg-red-600 hover:bg-red-700"
          >
            Reset
          </Button>
          <Button isLoading={isLoading} type="submit" className="w-full">
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateStationPage;

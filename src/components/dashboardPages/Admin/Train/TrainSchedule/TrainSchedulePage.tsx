"use client";
import CreateTrainScheduleModal from "@/components/modals/CreateTrainScheduleModal";
import Button from "@/components/reusable/Button";
import CustomLoader from "@/components/reusable/CustomLoader";
import CustomStatus from "@/components/reusable/CustomStatus";
import SearchBar from "@/components/reusable/SearchBar";
import { TQuery } from "@/interface/query";
import { useGetAllScheduleQuery } from "@/redux/features/schedule.features";
import { Plus } from "lucide-react";
import { useState } from "react";

const TrainSchedulePage = ({ limit, page, search }: TQuery) => {
  const [searchItem, setSearch] = useState<string>("");
  const [openCreateTrainSchedule, setOpenCreateTrainSchedule] =
    useState<boolean>(false);

  const { isError, isLoading, data, error } = useGetAllScheduleQuery(
    { limit, page, search },
    { refetchOnMountOrArgChange: true },
  );

  const schedules = data?.data?.data;
  const meta = data?.data?.meta;
  console.log(schedules);
  console.log(error);
  return (
    <div>
      <div className="flex items-center justify-between pb-2">
        <SearchBar
          placeholder="Search permission..."
          value={searchItem}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
        />

        <Button onClick={() => setOpenCreateTrainSchedule(true)}>
          <Plus size={18} />
          Create Schedule
        </Button>
      </div>

      <div>
        {isLoading ? (
          <CustomLoader />
        ) : isError ? (
          <CustomStatus type="error" />
        ) : !schedules?.length ? (
          <CustomStatus type="empty" />
        ) : (
          <></>
        )}
      </div>

      {openCreateTrainSchedule && (
        <CreateTrainScheduleModal
          isOpen={openCreateTrainSchedule}
          onClose={() => setOpenCreateTrainSchedule(false)}
        />
      )}
    </div>
  );
};

export default TrainSchedulePage;

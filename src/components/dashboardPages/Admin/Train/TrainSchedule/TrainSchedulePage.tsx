"use client";
import CreateTrainScheduleModal from "@/components/modals/CreateTrainScheduleModal";
import Button from "@/components/reusable/Button";
import CustomLoader from "@/components/reusable/CustomLoader";
import CustomStatus from "@/components/reusable/CustomStatus";
import SearchBar from "@/components/reusable/SearchBar";
import { Table } from "@/components/reusable/Table";
import { ActionButton } from "@/components/reusable/ActionButton";
import { TD, TH } from "@/components/reusable/TableCell";
import { TableHead } from "@/components/reusable/TableHead";
import { TablePagination } from "@/components/reusable/TablePagination";
import { TableRow } from "@/components/reusable/TableRow";
import { TQuery } from "@/interface/query";
import { IScheduleResponse } from "@/interface/schedule";
import { useGetAllScheduleQuery } from "@/redux/features/schedule.features";
import { Plus } from "lucide-react";
import moment from "moment";
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
          <div className="relative">
            <Table>
              <TableHead>
                <TableRow types="HEAD">
                  <TH>SL</TH>
                  <TH>Schedule Name</TH>

                  <TH>Direction</TH>
                  <TH>Start Time</TH>
                  <TH>Running Days</TH>
                  <TH>Valid From</TH>
                  <TH>Valid Until</TH>
                  <TH>Status</TH>
                  <TH>Created At</TH>
                  <TH>Action</TH>
                </TableRow>
              </TableHead>

              <tbody
                className="
        [&_tr:nth-child(odd)]:bg-white
        [&_tr:nth-child(even)]:bg-gray-50
      "
              >
                {schedules?.map((item: IScheduleResponse, idx: number) => (
                  <TableRow key={item.id} idx={idx} types="BODY">
                    <TD>{idx + 1}</TD>
                    <TD>{item.name}</TD>

                    <TD>{item.direction}</TD>
                    <TD>{item.startTime}</TD>
                    <TD>
                      {item.runningDays
                        .map((day) => day.slice(0, 3))
                        .join(", ")}
                    </TD>

                    <TD>{moment(item.validFrom).format("ll")}</TD>
                    <TD>{moment(item.validUntil).format("ll")}</TD>
                    <TD>{item.isActive ? "Active" : "Inactive"}</TD>
                    <TD>{moment(item.createdAt).format("ll")}</TD>
                    <TD>
                      <ActionButton
                        links={[
                          {
                            id: 1,
                            label: "Details",
                            path: `schedule/details/${item.id}`,
                          },
                        ]}
                      />
                    </TD>
                  </TableRow>
                ))}
              </tbody>
            </Table>

            <TablePagination
              page={meta?.page ?? 1}
              totalPages={meta?.totalPages ?? 1}
              dataLength={schedules?.length}
            />
          </div>
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

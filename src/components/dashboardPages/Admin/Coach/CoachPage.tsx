"use client";
import CreateCoachModal from "@/components/modals/CreateCoachModal";
import Button from "@/components/reusable/Button";
import CustomLoader from "@/components/reusable/CustomLoader";
import CustomStatus from "@/components/reusable/CustomStatus";
import SearchBar from "@/components/reusable/SearchBar";
import { Table } from "@/components/reusable/Table";
import { TableAction } from "@/components/reusable/TableAction";
import { TD, TH } from "@/components/reusable/TableCell";
import { TableHead } from "@/components/reusable/TableHead";
import { TablePagination } from "@/components/reusable/TablePagination";
import { TableRow } from "@/components/reusable/TableRow";
import { ICoach } from "@/interface/coach";
import { useGetAllCoachQuery } from "@/redux/features/coach.features";
import { Plus } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";

const CoachPage = ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search: string;
}) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [searchItem, setSearch] = useState("");
  const { isLoading, data, isError } = useGetAllCoachQuery(
    { page, limit, search },
    { refetchOnMountOrArgChange: true },
  );
  const coaches = data?.data?.data || [];
  const meta = data?.data?.meta as TMetaConfig;
  return (
    <div>
      <div className="flex items-center justify-between pb-2">
        <SearchBar
          placeholder="Search permission..."
          value={searchItem}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
        />
        <Button onClick={() => setModalOpen(true)}>
          <Plus size={18} />
          Create Coach
        </Button>
      </div>
      {isLoading ? (
        <CustomLoader />
      ) : isError ? (
        <CustomStatus type="error" />
      ) : !coaches?.length ? (
        <CustomStatus type="empty" />
      ) : (
        <div className="relative">
          {/* {isFetching && (
            <div className=" absolute inset-0 w-full z-50 flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
              <CustomLoader />
            </div>
          )} */}
          <Table>
            <TableHead>
              <TableRow>
                <TH>SL</TH>
                <TH>Code</TH>
                <TH>Name</TH>
                <TH>Type</TH>
                <TH>Coach Model</TH>
                <TH>Layout</TH>
                <TH>Seats</TH>
                <TH>Staus</TH>
                <TH>Date</TH>
                <TH>Action</TH>
              </TableRow>
            </TableHead>

            <tbody
              className="
    [&_tr:nth-child(odd)]:bg-white
    [&_tr:nth-child(even)]:bg-gray-50
  "
            >
              {coaches?.map((item: ICoach, idx: number) => (
                <TableRow key={item?.id}>
                  <TD>{++idx}</TD>
                  <TD>{item?.coachCode}</TD>
                  <TD>{item?.coachNumber}</TD>
                  <TD>{item?.coachModel?.type}</TD>
                  <TD>{item?.coachModel?.name}</TD>
                  <TD>{item?.coachModel?.layoutType}</TD>
                  <TD>{item?.coachModel?.totalSeats}</TD>
                  <TD>{item?.status}</TD>
                  <TD>{moment(item?.createdAt).format("ll")}</TD>

                  <TD>
                    <TableAction
                      links={[
                        {
                          id: 1,
                          label: "View Details",
                          path: `coaches/${item?.id}`,
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
            dataLength={coaches?.length}
          />
        </div>
      )}

      {isModalOpen && (
        <CreateCoachModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CoachPage;

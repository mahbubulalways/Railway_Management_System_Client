"use client";
import CreateCoachModal from "@/components/modals/CreateCoachModal";
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
import { useGetCoachViaStatusQuery } from "@/redux/features/coach.features";
import moment from "moment";
import React, { useState } from "react";

const CoachViaStatusPage = ({
  page,
  limit,
  search,
  status,
}: {
  page: number;
  limit: number;
  search: string;
  status: string;
}) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [searchItem, setSearch] = useState("");
  const { isLoading, data, isError } = useGetCoachViaStatusQuery(
    { page, limit, search, status },
    { refetchOnMountOrArgChange: true },
  );
  const coaches = data?.data?.data || [];
  const meta = data?.data?.meta as TMetaConfig;
  console.log(coaches);
  return (
    <div>
      <div className="flex items-center justify-between pb-2">
        <SearchBar
          placeholder="Search code name type layout seats status..."
          value={searchItem}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
        />
        {meta?.totalData ? (
          <h1 className="text-2xl font-semibold text-[#006A4E]">
            Total:
            {meta?.totalData > 10 ? meta?.totalData : `0${meta?.totalData}`}
          </h1>
        ) : (
          ""
        )}
      </div>
      {isLoading ? (
        <CustomLoader />
      ) : isError ? (
        <CustomStatus type="error" />
      ) : !coaches?.length ? (
        <CustomStatus type="empty" />
      ) : (
        <div className="relative">
          <Table>
            <TableHead>
              <TableRow types="HEAD">
                <TH>SL</TH>
                <TH>Code</TH>
                <TH>Name</TH>
                <TH>Type</TH>
                <TH>Coach Model</TH>
                <TH>Layout</TH>
                <TH>Seats</TH>
                <TH>Staus</TH>
                {status == "ASSIGNED" ? <TH>Asssigned</TH> : ""}
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
                <TableRow key={item?.id} types="BODY" idx={idx}>
                  <TD>{++idx}</TD>
                  <TD>{item?.coachCode}</TD>
                  <TD>{item?.coachNumber}</TD>
                  <TD>{item?.coachModel?.type}</TD>
                  <TD>{item?.coachModel?.name}</TD>
                  <TD>{item?.coachModel?.layoutType}</TD>
                  <TD>{item?.coachModel?.totalSeats}</TD>
                  <TD>{item?.status}</TD>
                  <TD>{item?.trainCoach?.train?.name}</TD>
                  <TD>{moment(item?.createdAt).format("ll")}</TD>

                  <TD>
                    <TableAction
                      links={[
                        {
                          id: 1,
                          label: "View Details",
                          path: `${item?.id}`,
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

export default CoachViaStatusPage;

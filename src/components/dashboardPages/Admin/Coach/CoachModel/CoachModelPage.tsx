"use client";
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
import { ICoachModel } from "@/interface/coach-model";
import { useGetAllCoachModelQuery } from "@/redux/features/coach-model.feature";
import { Plus } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
const CoachModelPage = ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search: string;
}) => {
  const { isLoading, data, isError, error } = useGetAllCoachModelQuery(
    { page, limit, search },
    { refetchOnMountOrArgChange: true },
  );
  console.log(error);
  const coachModels = data?.data?.data || [];
  const meta = data?.data?.meta as TMetaConfig;

  const [searchItem, setSearch] = useState("");

  return (
    <div>
      <div className="flex items-center justify-between pb-2">
        <SearchBar
          placeholder="Search name, seats, type..."
          value={searchItem}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
        />
        <Link href={"model/create"}>
          <Button>
            <Plus size={18} />
            Create Model
          </Button>
        </Link>
      </div>
      {isLoading ? (
        <CustomLoader />
      ) : isError ? (
        <CustomStatus type="error" />
      ) : !coachModels?.length ? (
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
                <TH>Name</TH>
                <TH>Type</TH>
                <TH>Seats</TH>
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
              {coachModels?.map((item: ICoachModel, idx: number) => (
                <TableRow key={item?.id}>
                  <TD>{++idx}</TD>
                  <TD>
                    {item?.name
                      ?.toLocaleLowerCase()
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase())}
                  </TD>
                  <TD>{item?.type}</TD>
                  <TD>{item?.totalSeats}</TD>
                  <TD>{moment(item?.createdAt).format("ll")}</TD>

                  <TD>
                    <TableAction
                      links={[
                        {
                          id: 1,
                          label: "View Details",
                          path: `model/${item?.id}`,
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
            dataLength={coachModels?.length}
          />
        </div>
      )}
    </div>
  );
};

export default CoachModelPage;

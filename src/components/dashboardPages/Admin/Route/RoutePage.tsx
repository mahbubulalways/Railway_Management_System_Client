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
import { TQuery } from "@/interface/query";
import { IRouteResponse } from "@/interface/route";
import { useGetAllRouteQuery } from "@/redux/features/route.feature";
import { Plus } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";

const RoutePage = ({ limit, page, search }: TQuery) => {
  const { isError, isLoading, data } = useGetAllRouteQuery(
    { limit, page, search },
    { refetchOnMountOrArgChange: true },
  );

  const permissions = data?.data?.data || [];
  const meta = data?.data?.meta as TMetaConfig;

  const [searchItem, setSearch] = useState("");

  return (
    <div>
      <div className="flex items-center justify-between pb-2">
        <SearchBar
          placeholder="Search name..."
          value={searchItem}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
        />
        <Link href={"routes/create"}>
          <Button>
            <Plus size={18} />
            Create Route
          </Button>
        </Link>
      </div>
      {isLoading ? (
        <CustomLoader />
      ) : isError ? (
        <CustomStatus type="error" />
      ) : !permissions?.length ? (
        <CustomStatus type="empty" />
      ) : (
        <div className="relative">
          <Table>
            <TableHead>
              <TableRow>
                <TH>SL</TH>
                <TH>Route Name</TH>
                <TH>Source</TH>
                <TH>Destination</TH>
                <TH>Distance</TH>
                <TH>Stations</TH>
                <TH>Creation Date</TH>
                <TH>Action</TH>
              </TableRow>
            </TableHead>

            <tbody
              className="
    [&_tr:nth-child(odd)]:bg-white
    [&_tr:nth-child(even)]:bg-gray-50
  "
            >
              {permissions?.map((item: IRouteResponse, idx: number) => (
                <TableRow key={item?.id}>
                  <TD>{++idx}</TD>
                  <TD>{item?.name}</TD>
                  <TD>{item?.sourceStation?.name}</TD>
                  <TD>{item?.destinationStation?.name}</TD>
                  <TD>{item?.distance}km</TD>
                  <TD>{item?._count?.routeStations}</TD>
                  <TD>{moment(item?.createdAt).format("ll")}</TD>
                  <TD>
                    <TableAction
                      links={[
                        {
                          id: 1,
                          label: "Details",
                          path: `routes/details/${item?.id}`,
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
            dataLength={permissions?.length}
          />
        </div>
      )}
    </div>
  );
};

export default RoutePage;

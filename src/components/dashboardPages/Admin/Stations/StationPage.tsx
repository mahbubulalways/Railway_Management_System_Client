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
import { IStation } from "@/interface/station";
import { useGetAllStationsQuery } from "@/redux/features/station.features";
import { Plus } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
const StationPage = ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search: string;
}) => {
  const { isLoading, data, isError, error } = useGetAllStationsQuery(
    { page, limit, search },
    { refetchOnMountOrArgChange: true },
  );
  const stations = data?.data?.data || [];
  const meta = data?.data?.meta as TMetaConfig;
  const [searchItem, setSearchItem] = useState(search);

  return (
    <div className="relative">
      <div className="flex items-center justify-between pb-2">
        <SearchBar
          placeholder="Search id division district..."
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          onClear={() => setSearchItem("")}
        />
        <Link href={"stations/create"}>
          <Button>
            <Plus size={18} />
            Create Station
          </Button>
        </Link>
      </div>
      {isLoading ? (
        <CustomLoader />
      ) : isError ? (
        <CustomStatus type="error" />
      ) : !stations?.length ? (
        <CustomStatus type="empty" />
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TH>SL</TH>
                <TH>ID</TH>
                <TH>Name</TH>
                <TH>Type</TH>
                <TH>Division</TH>
                <TH>District</TH>
                <TH>Status</TH>
                <TH>Established</TH>
                <TH>Action</TH>
              </TableRow>
            </TableHead>

            <tbody
              className="
    [&_tr:nth-child(odd)]:bg-white
    [&_tr:nth-child(even)]:bg-gray-50
  "
            >
              {stations?.map((item: IStation, idx: number) => (
                <TableRow key={item?.id}>
                  <TD>{++idx}</TD>
                  <TD>{item?.stationId}</TD>
                  <TD>{item?.name}</TD>
                  <TD>{item?.type}</TD>
                  <TD>{item?.division}</TD>
                  <TD>{item?.district}</TD>
                  <TD>{item?.status}</TD>
                  <TD>{moment(item?.established).format("ll")}</TD>
                  <TD>
                    <TableAction
                      links={[
                        {
                          id: 1,
                          label: "View Details",
                          path: `stations/details/${item?.stationId}`,
                        },
                      ]}
                      buttons={[
                        {
                          id: 1,
                          title: "Delete Station",
                          onClick: () => {},
                        },
                        {
                          id: 2,
                          title: "Edit Station",
                          onClick: () => {},
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
            dataLength={stations?.length}
          />
        </>
      )}
    </div>
  );
};

export default StationPage;

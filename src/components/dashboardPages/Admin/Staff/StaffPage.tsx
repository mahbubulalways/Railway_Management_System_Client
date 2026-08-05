"use client";
import CreateStaffModal from "@/components/modals/CreateStaffModal";
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
import { TStaffResponse } from "@/interface/staff";
import { useGetAllStaffQuery } from "@/redux/features/staff.features";
import { Plus } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useState } from "react";

const StaffPage = ({ limit, page, search }: TQuery) => {
  const { data, isLoading, isError, error } = useGetAllStaffQuery(
    { limit, page, search },
    { refetchOnMountOrArgChange: true },
  );

  const [searchItem, setSearch] = useState<string>("");
  const [openCreateStaffModal, setOpenCreateStaffModal] =
    useState<boolean>(false);

  const staffs = data?.data?.data || [];
  const meta = data?.data?.meta as TMetaConfig;
  console.log(staffs);
  return (
    <div>
      <div className="flex items-center justify-between pb-2">
        <SearchBar
          placeholder="Search permission..."
          value={searchItem}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
        />

        <Button onClick={() => setOpenCreateStaffModal(true)}>
          <Plus size={18} />
          Create Staff
        </Button>
      </div>
      <div>
        {isLoading ? (
          <CustomLoader />
        ) : isError ? (
          <CustomStatus type="error" />
        ) : !staffs?.length ? (
          <CustomStatus type="empty" />
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow types="HEAD">
                  <TH>SL</TH>
                  <TH>Avatar</TH>
                  <TH>Name</TH>
                  <TH>Email</TH>
                  <TH>Phone</TH>
                  <TH>Designation</TH>
                  <TH>Station</TH>
                  <TH>Salary</TH>
                  <TH>Action</TH>
                </TableRow>
              </TableHead>

              <tbody>
                {staffs?.map((item: TStaffResponse, idx: number) => (
                  <TableRow key={item?.id} types="BODY" idx={idx}>
                    <TD>{++idx}</TD>
                    <TD>
                      <Image
                        src={item?.avatar as string}
                        height={200}
                        width={200}
                        className="h-14  w-14 object-cover rounded-full"
                        alt={`avater_${idx}`}
                      />
                    </TD>
                    <TD>{item?.name}</TD>
                    <TD>{item?.user?.email}</TD>
                    <TD>{item?.user?.phone}</TD>
                    <TD>{item?.staffType?.type}</TD>
                    <TD>{item?.station?.name}</TD>
                    <TD>Tk{item?.salary}</TD>
                    <TD>
                      <ActionButton
                        links={[
                          {
                            id: 1,
                            label: "View Details",
                            path: `staffs/details/${item?.staffId}`,
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
              dataLength={staffs?.length}
            />
          </>
        )}
      </div>
      {openCreateStaffModal && (
        <CreateStaffModal
          isOpen={openCreateStaffModal}
          onClose={() => setOpenCreateStaffModal(false)}
        />
      )}
    </div>
  );
};

export default StaffPage;

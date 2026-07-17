"use client";
import CreateStaffTypeModal from "@/components/modals/CreateStaffTypeModal";
import ShowStaffPermissionModal from "@/components/modals/ShowStaffPermissionModal";
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
import { IStaffType } from "@/interface/staff-type";
import { useGetStaffTypesQuery } from "@/redux/features/staff.features";
import { Plus } from "lucide-react";
import moment from "moment";
import { useState } from "react";
const StaffTypePage = ({ page, limit }: { page: number; limit: number }) => {
  const { isLoading, data, isError } = useGetStaffTypesQuery(
    { page, limit },
    { refetchOnMountOrArgChange: true },
  );
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const staffTypes = data?.data?.data || [];
  const meta = data?.data?.meta as TMetaConfig;

  const [search, setSearch] = useState("");
  const [openPermissionModal, setOpenPermissionModal] =
    useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);

  // TESTING
  const links = [
    {
      id: 1,
      label: "View",
      path: "/vew",
    },
  ];

  const handleOpenPermissionModal = (staffId: string) => {
    setOpenPermissionModal(!openPermissionModal);
    setSelectedStaffId(staffId);
  };

  console.log("permissio " + openPermissionModal);
  console.log(selectedStaffId);
  console.log("delete " + openDeleteModal);
  return (
    <div className="relative">
      <div className="flex items-center justify-between pb-2">
        <SearchBar
          placeholder="Search staff type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
        />
        <Button onClick={() => setModalOpen(true)}>
          <Plus size={18} />
          Add Staff Type
        </Button>
      </div>
      {isLoading ? (
        <CustomLoader />
      ) : isError ? (
        <CustomStatus type="error" />
      ) : !staffTypes?.length ? (
        <CustomStatus type="empty" />
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TH>SL</TH>
                <TH>Staff Type</TH>
                <TH>Permissions</TH>
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
              {staffTypes?.map((item: IStaffType, idx: number) => (
                <TableRow key={item?.id}>
                  <TD>{++idx}</TD>
                  <TD>
                    {item?.type
                      ?.toLocaleLowerCase()
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase())}
                  </TD>
                  <TD>{item?.staffPermissions.length}</TD>
                  <TD>{moment(item?.createdAt).format("lll")}</TD>

                  <TD>
                    <TableAction
                      links={links}
                      buttons={[
                        {
                          id: 1,
                          title: "View permissions",
                          onClick: () => handleOpenPermissionModal(item.id),
                        },
                        {
                          id: 2,
                          title: "Delete",
                          onClick: () => {
                            setSelectedStaffId(item.id);
                            setOpenDeleteModal(!openDeleteModal);
                          },
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
            dataLength={staffTypes?.length}
          />
        </>
      )}

      <CreateStaffTypeModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />

      <ShowStaffPermissionModal
        isOpen={openPermissionModal}
        onClose={() => setOpenPermissionModal(false)}
        staffId={selectedStaffId as string}
      />
    </div>
  );
};

export default StaffTypePage;

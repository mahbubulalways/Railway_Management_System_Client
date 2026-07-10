"use client";
import CreatePermissionModal from "@/components/modals/CreatePermissionModal";
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
import { IPermission } from "@/interface/permission";
import { TQuery } from "@/interface/query";
import { useGetPermissionQuery } from "@/redux/features/permission.feature";
import { Plus } from "lucide-react";
import { useState } from "react";
const PermissionPage = ({ page, limit, search }: TQuery) => {
  const { isLoading, data, isError } = useGetPermissionQuery(
    { page, limit, search },
    { refetchOnMountOrArgChange: true },
  );
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const permissions = data?.data?.data || [];
  const meta = data?.data?.meta as TMetaConfig;

  const [searchItem, setSearch] = useState("");

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
          Add Permission
        </Button>
      </div>
      {isLoading ? (
        <CustomLoader />
      ) : isError ? (
        <CustomStatus type="error" />
      ) : !permissions?.length ? (
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
                <TH>Permission</TH>
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
              {permissions?.map((item: IPermission, idx: number) => (
                <TableRow key={item?.id}>
                  <TD>{++idx}</TD>
                  <TD>
                    {item?.permission
                      ?.toLocaleLowerCase()
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase())}
                  </TD>

                  <TD>{new Date(item?.createdAt).toLocaleDateString()}</TD>

                  <TD>
                    <TableAction />
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

      <CreatePermissionModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default PermissionPage;

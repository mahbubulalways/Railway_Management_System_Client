"use client";
import AddCoachToTrainModal from "@/components/modals/AddCoachToTrainModal";
import CreateTrainModal from "@/components/modals/CreateTrainModal";
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
import { ITrain } from "@/interface/train";
import { useGetAllTrainQuery } from "@/redux/features/train.features";
import { Plus } from "lucide-react";
import moment from "moment";
import { useState } from "react";

const TrainPage = ({ limit, page, search }: TQuery) => {
  const [openCreateTrainModal, setOpenCreateTrainModal] =
    useState<boolean>(false);
  const [trainId, setTrainId] = useState<string>("");
  const [coachOpenModel, setCoachOpenModel] = useState<boolean>(false);
  const { isError, isLoading, data } = useGetAllTrainQuery(
    { limit, page, search },
    { refetchOnMountOrArgChange: true },
  );
  const trains = data?.data?.data || [];
  const meta = data?.data?.meta as TMetaConfig;
  const [searchItem, setSearch] = useState<string>("");

  return (
    <div>
      <div className="flex items-center justify-between pb-2">
        <SearchBar
          placeholder="Search permission..."
          value={searchItem}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
        />

        <Button onClick={() => setOpenCreateTrainModal(true)}>
          <Plus size={18} />
          Create Train
        </Button>
      </div>
      {isLoading ? (
        <CustomLoader />
      ) : isError ? (
        <CustomStatus type="error" />
      ) : !trains?.length ? (
        <CustomStatus type="empty" />
      ) : (
        <div className="relative">
          <Table>
            <TableHead>
              <TableRow>
                <TH>SL</TH>
                <TH>Train Id</TH>
                <TH>Name</TH>
                <TH>Type</TH>
                <TH>max Speed</TH>
                <TH>manufacture Year</TH>
                <TH>Coaches</TH>
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
              {trains?.map((item: ITrain, idx: number) => (
                <TableRow key={item?.id}>
                  <TD>{++idx}</TD>
                  <TD>{item?.trainId}</TD>
                  <TD>{item?.name}</TD>
                  <TD>{item?.type}</TD>
                  <TD>{item?.maxSpeed}</TD>
                  <TD>{item?.manufactureYear}</TD>
                  <TD>{item?._count?.coaches}</TD>
                  <TD>{moment(item?.createdAt).format("ll")}</TD>
                  <TD>
                    <TableAction
                      links={[
                        {
                          id: 1,
                          label: "Details",
                          path: `trains/details/${item?.trainId}`,
                        },
                      ]}
                      buttons={[
                        {
                          id: 1,
                          onClick: () => {
                            setCoachOpenModel(true);
                            setTrainId(item?.id);
                          },
                          title: "Add coach",
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
            dataLength={trains?.length}
          />
        </div>
      )}
      {openCreateTrainModal && (
        <CreateTrainModal
          isOpen={openCreateTrainModal}
          onClose={() => setOpenCreateTrainModal(false)}
        />
      )}

      {coachOpenModel && (
        <AddCoachToTrainModal
          isOpen={coachOpenModel}
          onClose={() => setCoachOpenModel(false)}
          trainId={trainId}
        />
      )}
    </div>
  );
};

export default TrainPage;

import TrainSchedulePage from "@/components/dashboardPages/Admin/Train/TrainSchedule/TrainSchedulePage";
import { TQuerySearch } from "@/interface/query";
import { modifyQuery } from "@/utils/modifyQuery";

const Page = async ({ searchParams }: TQuerySearch) => {
  const query = await searchParams;
  const { currentLimit, currentPage, currentSearch } = modifyQuery(query);
  return (
    <div>
      <TrainSchedulePage
        limit={currentLimit}
        page={currentPage}
        search={currentSearch}
      />
    </div>
  );
};

export default Page;

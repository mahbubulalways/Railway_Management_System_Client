import TrainPage from "@/components/dashboardPages/Admin/Train/TrainPage";
import { TQuerySearch } from "@/interface/query";
import { modifyQuery } from "@/utils/modifyQuery";

const Page = async ({ searchParams }: TQuerySearch) => {
  const query = await searchParams;
  const { currentLimit, currentPage, currentSearch } = modifyQuery(query);
  return (
    <div>
      <TrainPage
        limit={currentLimit}
        page={currentPage}
        search={currentSearch}
      />
    </div>
  );
};

export default Page;

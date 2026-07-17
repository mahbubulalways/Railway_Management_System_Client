import CoachViaStatusPage from "@/components/dashboardPages/Admin/Coach/CoachViaStatus/CoachViaStatusPage";
import { TQuerySearch } from "@/interface/query";
import { modifyQuery } from "@/utils/modifyQuery";

const Page = async ({ searchParams }: TQuerySearch) => {
  const query = await searchParams;
  const { currentLimit, currentPage, currentSearch } = modifyQuery(query);
  return (
    <>
      <CoachViaStatusPage
        limit={currentLimit}
        page={currentPage}
        search={currentSearch}
        status="AVAILABLE"
      />
    </>
  );
};

export default Page;

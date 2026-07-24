import StaffPage from "@/components/dashboardPages/Admin/Staff/StaffPage";
import { TQuerySearch } from "@/interface/query";
import { modifyQuery } from "@/utils/modifyQuery";

const Page = async ({ searchParams }: TQuerySearch) => {
  const query = await searchParams;
  const { currentLimit, currentPage, currentSearch } = modifyQuery(query);
  return (
    <div>
      <StaffPage
        limit={currentLimit}
        page={currentPage}
        search={currentSearch}
      />
    </div>
  );
};

export default Page;

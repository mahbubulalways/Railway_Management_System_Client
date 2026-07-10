import CoachModelPage from "@/components/dashboardPages/Admin/Coach/CoachModel/CoachModelPage";
import { TQuerySearch } from "@/interface/query";

const Page = async ({ searchParams }: TQuerySearch) => {
  const { page, limit, search } = await searchParams;
  const currentPage = Number(page) || 1;
  const currentLimit = Number(limit) || 10;
  const currentSearch = search || "";
  return (
    <div>
      <CoachModelPage
        limit={currentLimit}
        page={currentPage}
        search={currentSearch}
      />
    </div>
  );
};

export default Page;

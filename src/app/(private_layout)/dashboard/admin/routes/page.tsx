import RoutePage from "@/components/dashboardPages/Admin/Route/RoutePage";
import { TQuerySearch } from "@/interface/query";
const Page = async ({ searchParams }: TQuerySearch) => {
  const { limit, page, search } = await searchParams;
  const currentPage = Number(page) || 1;
  const currentLimit = Number(limit) || 10;
  const currentSearch = search || "";
  return (
    <div>
      <RoutePage
        limit={currentLimit}
        page={currentPage}
        search={currentSearch}
      />
    </div>
  );
};

export default Page;

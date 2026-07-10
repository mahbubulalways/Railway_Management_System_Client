import RouteDetailsPage from "@/components/dashboardPages/Admin/Route/RouteDetails/RouteDetailsPage";
import { TParams } from "@/interface/query";
const Page = async (props: TParams) => {
  const { id } = await props.params;
  return (
    <div>
      <RouteDetailsPage id={id} />
    </div>
  );
};

export default Page;

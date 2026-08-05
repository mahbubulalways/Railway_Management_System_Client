import StaffDetailsPage from "@/components/dashboardPages/Admin/Staff/StaffDetails/StaffDetailsPage";
import { TParams } from "@/interface/query";

const Page = async (params: TParams) => {
  const { id } = await params.params;
  return (
    <div>
      <StaffDetailsPage id={id} />
    </div>
  );
};

export default Page;

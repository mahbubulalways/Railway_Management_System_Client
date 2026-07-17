import TraiDetailsPage from "@/components/dashboardPages/Admin/Train/TrainDetails/TraiDetailsPage";
import { TParams } from "@/interface/query";

const Page = async (props: TParams) => {
  const { id } = await props.params;
  return (
    <div>
      <TraiDetailsPage id={id} />
    </div>
  );
};

export default Page;

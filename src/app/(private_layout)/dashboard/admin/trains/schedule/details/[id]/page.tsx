import TrainSheduleDetailsPage from "@/components/dashboardPages/Admin/Train/TrainSchedule/TrainSheduleDetails/TrainSheduleDetailsPage";
import { TParams } from "@/interface/query";

const Page = async (props: TParams) => {
  const { id } = await props.params;
  return (
    <>
      <TrainSheduleDetailsPage id={id} />
    </>
  );
};

export default Page;

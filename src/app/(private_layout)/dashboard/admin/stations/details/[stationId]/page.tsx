import StationDetailsPage from "@/components/dashboardPages/Admin/Stations/StationDetails/StationDetailsPage";

type PageProps = {
  params: Promise<{ stationId: string }>;
};
const Page = async (props: PageProps) => {
  const { stationId } = await props.params;
  return (
    <div>
      <StationDetailsPage stationId={stationId} />
    </div>
  );
};

export default Page;

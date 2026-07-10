import CoachModelDetailsPage from "@/components/dashboardPages/Admin/Coach/CoachModelDetails/CoachModelDetailsPage";

type PageProps = {
  params: Promise<{ id: string }>;
};
const Page = async (props: PageProps) => {
  const { id } = await props.params;
  return (
    <>
      <CoachModelDetailsPage id={id} />
    </>
  );
};

export default Page;

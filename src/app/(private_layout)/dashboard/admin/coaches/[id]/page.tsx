import CoachDetailsPage from "@/components/dashboardPages/Admin/Coach/CoachDetails/CoachDetailsPage";
type PageProps = {
  params: Promise<{ id: string }>;
};
const Page = async (props: PageProps) => {
  const { id } = await props.params;
  return (
    <>
      <CoachDetailsPage id={id} />
    </>
  );
};

export default Page;

import SearchTrainPage from "@/components/component/SearchTrain/SearchTrainPage";
type TSearchTrainParams = {
  searchParams: Promise<{
    from: string;
    to: string;
    date: string;
  }>;
};
const Page = async ({ searchParams }: TSearchTrainParams) => {
  const { from, date, to } = await searchParams;
  return (
    <div className="pt-40">
      <SearchTrainPage date={date} from={from} to={to} />
    </div>
  );
};

export default Page;

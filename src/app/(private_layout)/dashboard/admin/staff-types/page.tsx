import StaffTypePage from "@/components/dashboardPages/Admin/StaffType/StaffTypePage";

type Props = {
  searchParams: Promise<{ page?: string; limit?: string }>;
};

export default async function PermissionsPage({ searchParams }: Props) {
  const { page, limit } = await searchParams;

  const currentPage = Number(page) || 1;
  const currentLimit = Number(limit) || 10;

  return (
    <div>
      <StaffTypePage limit={currentLimit} page={currentPage} />
    </div>
  );
}

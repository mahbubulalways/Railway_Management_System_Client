import PermissionPage from "@/components/dashboardPages/Admin/Permission/PermissionPage";

type Props = {
  searchParams: Promise<{ page?: string; limit?: string }>;
};

export default async function PermissionsPage({ searchParams }: Props) {
  const { page, limit } = await searchParams;

  const currentPage = Number(page) || 1;
  const currentLimit = Number(limit) || 10;

  return (
    <div>
      <PermissionPage limit={currentLimit} page={currentPage} />
    </div>
  );
}

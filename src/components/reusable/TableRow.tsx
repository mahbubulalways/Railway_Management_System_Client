export const TableRow = ({ children }: { children: React.ReactNode }) => {
  return (
    <tr
      className="
        group
        border-b border-gray-100
        transition-all
        duration-200
        hover:bg-[#006A4E]/5
      "
    >
      {children}
    </tr>
  );
};

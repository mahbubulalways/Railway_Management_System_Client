export const TH = ({ children }: { children: React.ReactNode }) => {
  return (
    <th
      className="
        px-6 py-4
        text-left
        uppercase
        tracking-wider
        font-semibold
        text-white
      "
    >
      {children}
    </th>
  );
};

export const TD = ({ children }: { children: React.ReactNode }) => {
  return (
    <td
      className="
        px-6 py-4
        text-lg
        text-gray-700
        whitespace-nowrap
      "
    >
      {children}
    </td>
  );
};

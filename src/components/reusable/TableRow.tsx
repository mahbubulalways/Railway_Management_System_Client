export const TableRow = ({
  children,
  idx = 0,
  types,
}: {
  children: React.ReactNode;
  idx?: number;
  types: "BODY" | "HEAD";
}) => {
  const isOdd = idx % 2 !== 0;

  return (
    <tr
      className={`
        group
        border-b border-gray-100
        transition-all
        duration-200
     ${
       types === "BODY"
         ? `${isOdd ? "bg-gray-50" : "bg-white"} hover:bg-gray-200`
         : ""
     }
  
        
      `}
    >
      {children}
    </tr>
  );
};

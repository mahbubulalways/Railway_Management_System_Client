export const Table = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-t-2xl border border-gray-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="overflow-x-auto rounded-2xl">
        <table className="w-full border-collapse">{children}</table>
      </div>
    </div>
  );
};

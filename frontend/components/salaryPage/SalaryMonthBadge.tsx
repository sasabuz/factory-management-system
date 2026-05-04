"use client";

const SalaryMonthBadge = () => {
  const now = new Date();
  const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const month = prev.toLocaleString("default", { month: "long" });
  const year = prev.getFullYear();

  return (
    <div className="flex px-3 py-1.5 bg-green-50 text-green-700 text-sm font-semibold border border-green-200 rounded-lg shadow-sm">
      {month} {year}
    </div>
  );
};

export default SalaryMonthBadge;

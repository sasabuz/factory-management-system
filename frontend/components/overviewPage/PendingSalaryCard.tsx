"use client";

import { useOverviewStore } from "@/stores/overviewStore";
import { useEffect, useState } from "react";
import { Loader2, AlertTriangle } from "lucide-react";
import CardSkeleton from "../skeletons/CardSkeleton";

const PendingSalaryCard = () => {
  const {
    totalPaid,
    totalUnpaid,
    gettingSalaryStatus,
    getSalaryStatus
  } = useOverviewStore();

  const [monthLabel, setMonthLabel] = useState("");

  useEffect(() => {
    // Current date
    const today = new Date();

    // Previous month calculation 
    const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

    // Month string for API "YYYY-MM"
    const monthString = `${prevMonth.getFullYear()}-${String(prevMonth.getMonth() + 1).padStart(2, "0")}`;

    // Month label for display "October 2025"
    const label = prevMonth.toLocaleDateString(undefined, { month: "long", year: "numeric" });
    setMonthLabel(label);
    // Call API
    getSalaryStatus(monthString);
  }, []);

  //loading
  const shouldOpenSkeleton = totalPaid === null || totalUnpaid === null ||  gettingSalaryStatus;
  if(shouldOpenSkeleton) return <CardSkeleton></CardSkeleton>

  return (
    <div className="
      p-5 rounded-xl border 
      bg-white dark:bg-[#0f1115]
      border-gray-200 dark:border-gray-800 
      shadow-sm hover:shadow-md hover:-translate-y-0.5
      transition-all duration-300
    ">
      {/* TITLE */}
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="text-yellow-500" size={22} />
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Pending Salary - {monthLabel}
        </h2>
      </div>

      {/* VALUE */}
      <div className="flex items-center justify-between mt-2">
        {gettingSalaryStatus ? (
          <Loader2 className="animate-spin text-yellow-500" size={26} />
        ) : (
          <span className="text-3xl font-bold text-gray-900 dark:text-gray-50">
            {totalUnpaid}
          </span>
        )}

        {/* RIGHT SIDE LABEL */}
        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400">Unpaid Employees</p>
          <p className="text-sm text-green-500">{totalPaid} Paid</p>
        </div>
      </div>
    </div>
  );
};

export default PendingSalaryCard;

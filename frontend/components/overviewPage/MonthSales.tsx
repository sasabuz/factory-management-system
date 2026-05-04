"use client";

import { useOverviewStore } from "@/stores/overviewStore";
import { useEffect } from "react";
import { Loader2, BarChart2 } from "lucide-react";
import CardSkeleton from "../skeletons/CardSkeleton";

const MonthSales = () => {
  const { salesMonth, gettingSales, getSales } = useOverviewStore();

  useEffect(() => {
    getSales();
  }, []);

  
  const shouldOpenSkeleton = salesMonth.count===null || gettingSales;
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
        <BarChart2 className="text-orange-500" size={22} />
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          This Month Sales
        </h2>
      </div>

      {/* VALUE */}
      <div className="flex items-center justify-between mt-2">
        {gettingSales ? (
          <Loader2 className="animate-spin text-orange-500" size={26} />
        ) : (
          <div className="text-gray-900 dark:text-gray-50">
            <p className="text-2xl font-bold">{salesMonth.count}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total: BDT {salesMonth.total}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthSales;

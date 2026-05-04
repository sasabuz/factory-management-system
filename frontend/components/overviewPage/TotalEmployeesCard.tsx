"use client";

import { useOverviewStore } from "@/stores/overviewStore";
import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import CardSkeleton from "../skeletons/CardSkeleton";

const TotalEmployeesCard = () => {
  const { totalEmployees, getTotalEmployees, gettingTotalEmployees } =
    useOverviewStore();
 
  useEffect(() => {
    getTotalEmployees();
    
  }, []);


  //loading
  const shouldOpenSkeleton = totalEmployees === null || gettingTotalEmployees;
  if(shouldOpenSkeleton) return <CardSkeleton></CardSkeleton>

  return (
    <div className="
      relative rounded-2xl p-6 
      bg-white dark:bg-[#111214] 
      border border-gray-200 dark:border-white/10
      shadow-md dark:shadow-[0_0_25px_-10px_rgba(0,0,0,0.8)]
      hover:shadow-lg dark:hover:shadow-[0_0_35px_-5px_rgba(0,0,0,0.9)]
      transition-all duration-300
    ">

      {/* Top subtle glow line */}
      <div className="absolute top-0 left-0 w-full h-[1px] 
        bg-gradient-to-r from-transparent via-blue-400/40 to-transparent
      "></div>

      {/* Card content */}
      <div className="flex items-center gap-5">

        {/* Icon Circle */}
        <div className="
          w-14 h-14 rounded-xl 
          bg-blue-50 dark:bg-blue-900/20
          flex items-center justify-center 
          border border-gray-100 dark:border-white/10
          shadow-inner
        ">
          <Users className="w-7 h-7 text-blue-600 dark:text-blue-400" />
        </div>

        {/* Text */}
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Total Employees</p>

          {gettingTotalEmployees ? (
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 animate-pulse">
              Loading…
            </p>
          ) : (
            <p className="text-3xl font-semibold text-gray-900 dark:text-white">
              {totalEmployees ?? 0}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TotalEmployeesCard;

"use client";

import { useEffect, useState } from "react";
import { useOverviewStore } from "@/stores/overviewStore";
import { Users } from "lucide-react";
import CardSkeleton from "../skeletons/CardSkeleton";

// get local date
const getLocalISODate = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const PresentEmployees = () => {
  const [today, setToday] = useState(getLocalISODate());
  const {
    totalPresentEmployees,
    gettingPresentEmployees,
    getPresentEmployees,
  } = useOverviewStore();

  // automatic date update after 12am
  useEffect(() => {
    const now = new Date();
    const nextDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );
    const timeUntilMidnight = nextDay.getTime() - now.getTime() + 1000;

    const timeoutId = setTimeout(() => {
      setToday(getLocalISODate());
      const intervalId = setInterval(() => {
        setToday(getLocalISODate());
      }, 60000);
      return () => clearInterval(intervalId);
    }, timeUntilMidnight);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    getPresentEmployees(today);
  }, [today]);

  //loading
  const shouldOpenSkeleton =
    totalPresentEmployees === null || gettingPresentEmployees;
  if (shouldOpenSkeleton) return <CardSkeleton></CardSkeleton>;

  return (
    <div
      className="
      bg-white dark:bg-[#0f0f0f]
      border border-gray-200 dark:border-gray-700
      rounded-2xl p-5 shadow-sm
      hover:shadow-md dark:hover:shadow-lg
      transition-all duration-300
      flex items-center justify-between
    "
    >
      {/* Left side */}
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Present Employees
        </p>

        {/* DATE */}
        <p className="text-xs text-gray-400 dark:text-gray-500 -mt-1 mb-1">
          {today}
        </p>

        {gettingPresentEmployees ? (
          <p className="h-7 w-20 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mt-1"></p>
        ) : (
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mt-1">
            {totalPresentEmployees}
          </h2>
        )}
      </div>

      {/* Right side icon box */}
      <div
        className="
        h-12 w-12 rounded-xl 
        bg-green-100 dark:bg-green-900/30 
        flex items-center justify-center
      "
      >
        <Users className="text-green-600 dark:text-green-400" size={26} />
      </div>
    </div>
  );
};

export default PresentEmployees;

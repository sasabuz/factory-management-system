"use client";

import { Loader2 } from "lucide-react";

const WorkerOverviewSkeleton = () => {
  return (
    <div className="min-h-screen flex items-start justify-center pt-12 p-6">
      <div className="w-full max-w-md bg-white rounded-xl border border-gray-200 shadow-sm p-6 animate-pulse">

        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 mb-3"></div>
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </div>
      </div>
    </div>
  );
};

const SkeletonRow = () => (
  <div className="flex justify-between p-2 border-b border-gray-100 last:border-none">
    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
  </div>
);

export default WorkerOverviewSkeleton;

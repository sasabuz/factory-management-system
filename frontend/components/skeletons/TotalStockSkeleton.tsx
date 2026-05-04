"use client";

const TotalStockCardSkeleton = () => {
  return (
    <div
      className="
        p-5 rounded-xl border
        bg-white dark:bg-[#0f1115]
        border-gray-200 dark:border-gray-800
        shadow-sm animate-pulse
      "
    >
      {/* Title Skeleton */}
      <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>

      {/* Products Skeleton List */}
      <div className="grid grid-cols-2 gap-3">
        {/* header row */}
        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded justify-self-end"></div>

        {/* 6 rows skeleton */}
        {[...Array(3)].map((_, i) => (
          <div key={i} className="contents">
            <div className="h-4 w-28 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-12 bg-gray-300 dark:bg-gray-700 rounded justify-self-end"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalStockCardSkeleton;

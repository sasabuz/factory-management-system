"use client";

const PaginationSkeleton = () => {
  const skeletonPages = Array.from({ length: 2 });

  return (
    <div className="mt-5 flex justify-center space-x-2">
      {/* Previous button skeleton */}
      <div className="w-10 h-10 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />

      {skeletonPages.map((_, idx) => (
        <div
          key={idx}
          className="w-10 h-10 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"
        />
      ))}

      {/* Next button skeleton */}
      <div className="w-10 h-10 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
    </div>
  );
};

export default PaginationSkeleton;

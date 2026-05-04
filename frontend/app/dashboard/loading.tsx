import TableSkeleton from "@/components/skeletons/TableSkeleton";

const loading = () => {
  return (
    <div>
      {/* Header Skeleton */}
      <div className="h-8 w-1/4 bg-gray-200 dark:bg-gray-700 rounded"></div>

      <div className="border-2 border-border rounded p-10 mt-5 space-y-10 animate-pulse">
        {/* Input + Button Skeleton */}
        <div className="flex gap-5">
          <div className="h-10 flex-1 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-10 w-40 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Table Skeleton */}
        <div className="border border-border rounded p-2">
          <TableSkeleton />
        </div>

        {/* Pagination Skeleton */}
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default loading;

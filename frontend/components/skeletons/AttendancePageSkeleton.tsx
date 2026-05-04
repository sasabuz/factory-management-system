"use client";

const AttendancePageSkeleton = () => {
  return (
    <div className="p-4 space-y-6 animate-pulse">
      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="p-4 rounded shadow flex flex-col items-center justify-center bg-gray-300 h-20"
          ></div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              {Array.from({ length: 5 }).map((_, idx) => (
                <th key={idx} className="px-4 py-2">
                  <div className="h-4 w-16 bg-gray-300 rounded"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, idx) => (
              <tr key={idx}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <td key={i} className="px-4 py-2">
                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default AttendancePageSkeleton;
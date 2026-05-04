"use client";

const SummeryCardSkeleton = () => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6 animate-pulse">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div
          key={idx}
          className="p-4 rounded shadow flex flex-col items-center justify-center bg-gray-300 h-20"
        >
          <div className="h-6 w-12 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
};


export default SummeryCardSkeleton
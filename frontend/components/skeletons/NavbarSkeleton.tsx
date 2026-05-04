"use client";

const NavbarSkeleton = () => {
  return (
    <div className="flex items-center justify-between p-4 shadow-sm">
      {/* Left Title Skeleton */}
      <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>

      {/* Right Part Skeleton */}
      <div className="flex items-center gap-3">
        {/* Theme switch skeleton */}
        <div className="h-8 w-16 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>

        {/* Name & Avatar skeleton */}
        <div className="flex flex-col text-right gap-1">
          <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-3 w-12 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>

        {/* Logout button skeleton */}
        <div className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};

export default NavbarSkeleton;

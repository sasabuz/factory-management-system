"use client";

const SidebarSkeleton = () => {
  return (
    <div className="bg-green-900 text-gray-300 h-screen w-full flex flex-col p-5 animate-pulse">
      {/* Title */}
      <div className="h-8 w-40 bg-green-800 rounded mb-5"></div>
      <div className="h-8 w-40 bg-green-800 rounded mb-5"></div>

      {/* Separator */}
      <div className="h-px w-full bg-green-800 mb-5"></div>

      {/* Menu items skeleton */}
      <ul className="flex-1 space-y-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <li key={idx} className="flex items-center justify-between w-full px-4 py-2 rounded-lg">
            <div className="flex items-center gap-3">
              {/* Icon placeholder */}
              <div className="h-10 w-5 bg-green-800 rounded"></div>
              {/* Text placeholder */}
              <div className="h-10 w-24 bg-green-800 rounded"></div>
            </div>
          </li>
        ))}
      </ul>

      {/* Footer / Logout */}
      <div className="mt-auto pt-4">
        <div className="h-px w-full bg-green-800 mb-3"></div>
        <div className="h-8 w-full bg-green-800 rounded"></div>
      </div>
    </div>
  );
};

export default SidebarSkeleton;

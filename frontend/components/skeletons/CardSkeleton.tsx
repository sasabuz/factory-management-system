const CardSkeleton = () => {
  return (
    <div
      className="
        relative rounded-2xl p-6
        bg-white dark:bg-[#111214]
        border border-gray-200 dark:border-white/10
        shadow-md dark:shadow-[0_0_25px_-10px_rgba(0,0,0,0.8)]
        animate-pulse
      "
    >

      <div className="flex items-center gap-5">
        {/* Icon skeleton */}
        <div className="w-14 h-14 rounded-xl bg-gray-200 dark:bg-gray-700"></div>

        {/* Text skeleton */}
        <div className="flex flex-col gap-2">
          <div className="h-3 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;

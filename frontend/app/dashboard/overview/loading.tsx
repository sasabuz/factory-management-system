
const loading = () => {
  return (
    <div className="grid gap-5 animate-pulse">
      {/* Row 1 */}
      <div className="grid grid-cols-3 gap-10">
        <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
        <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
        <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
      </div>

      {/* Row 2 — Total Stock (big card) */}
      <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>

      {/* Row 3 */}
      <div className="grid grid-cols-2 gap-10">
        <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
        <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
      </div>

      {/* Row 4 */}
      <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
    </div>
  );
};

export default loading;

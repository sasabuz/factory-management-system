
const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      {/* Big 404 */}
      <h1 className="text-9xl font-extrabold text-green-800">404</h1>

      {/* Message */}
      <p className="mt-4 text-xl text-gray-700 font-medium text-center max-w-md">
        Oops! The page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFoundPage;

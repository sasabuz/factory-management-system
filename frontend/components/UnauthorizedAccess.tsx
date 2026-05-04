
import { ShieldAlert } from "lucide-react";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-6">
      {/* Icon */}
      <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />

      {/* Message */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-2">
        Unauthorized Access
      </h1>
      <p className="text-gray-500 max-w-md">
        You don’t have permission to view this page. Please contact your
        administrator if you think this is a mistake.
      </p>

    </div>
  );
};

export default Unauthorized;

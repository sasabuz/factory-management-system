"use client";

import { useAuthStore } from "@/stores/authStore";
import { useEffect } from "react";
import Image from "next/image";
import { Loader2, BadgeCheck } from "lucide-react";
import WorkerOverviewSkeleton from "../skeletons/WorkerOverviewSkeleton";

interface IUser {
  _id: string;
  employeeId: number;
  name: string;
  email: string;
  role: "admin" | "manager" | "accountant" | "worker";
  salary: number;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const WorkerOverviewPage = () => {
  const { user, checkCurrentUser, isLoading } = useAuthStore() as {
    user: IUser | null;
    checkCurrentUser: () => void;
    isLoading: boolean;
  };

  useEffect(() => {
    if (!user && !isLoading) checkCurrentUser();
  }, [user, isLoading, checkCurrentUser]);

  if (isLoading) return <WorkerOverviewSkeleton />;
  if (!user) return null;

  const formattedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedSalary = new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 0,
  }).format(user.salary);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-start justify-center pt-12 p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
        
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <Image
              src={user.image || "/profile-image.png"}
              alt={user.name}
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
            />
            {user.isActive && (
              <BadgeCheck className="absolute bottom-0 right-0 w-6 h-6 text-green-500" />
            )}
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-gray-900 dark:text-gray-100">{user.name}</h2>
          <span className="px-3 py-1 mt-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs capitalize">
            {user.role}
          </span>
        </div>

        <div className="space-y-4">
          <Detail label="Email" value={user.email} />
          <Detail label="Employee ID" value={user.employeeId} />
          <Detail label="Joining Date" value={formattedDate} />
          <Detail label="Salary" value={formattedSalary} />
          <Detail label="Status" value={user.isActive ? "Active" : "Inactive"} />
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex justify-between p-2 border-b border-gray-100 dark:border-gray-700 last:border-none">
    <span className="text-gray-500 dark:text-gray-400 text-sm">{label}</span>
    <span className="text-gray-700 dark:text-gray-100 font-medium">{value}</span>
  </div>
);

export default WorkerOverviewPage;

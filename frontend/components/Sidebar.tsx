"use client";

import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { ChevronRight, User } from "lucide-react";
import Link from "next/link";
import {
  Home,
  Clock,
  Users,
  DollarSign,
  FileText,
  Package,
  ChartLine,
} from "lucide-react";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { usePathname } from "next/navigation";

interface MenuItem {
  id: number;
  name: string;
  link: string;
  icon: any;
}

const Sidebar = () => {
  const { user, isLoading, checkCurrentUser } = useAuthStore();
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState("");

  // Menu definitions
  const AdminMenus: MenuItem[] = [
    { id: 1, name: "Overview", link: "/dashboard/overview/admin", icon: Home },
    { id: 7, name: "Productions", link: "/dashboard/production", icon: Package },
    { id: 5, name: "Sales", link: "/dashboard/sales", icon: ChartLine },
    { id: 2, name: "Attendance", link: "/dashboard/attendance", icon: Clock },
    { id: 3, name: "Employees", link: "/dashboard/employee", icon: Users },
    { id: 4, name: "Expense", link: "/dashboard/expense", icon: DollarSign },
    { id: 6, name: "Salary", link: "/dashboard/salary", icon: FileText },
  ];

  const ManagerMenus: MenuItem[] = [
    { id: 1, name: "Overview", link: "/dashboard/overview/manager", icon: Home },
    { id: 5, name: "Productions", link: "/dashboard/production", icon: Package },
    { id: 4, name: "Sales", link: "/dashboard/sales", icon: ChartLine },
    { id: 2, name: "Attendance", link: "/dashboard/attendance", icon: Clock },
    { id: 3, name: "Employees", link: "/dashboard/employee", icon: Users },
  ];

  const AccountantMenus: MenuItem[] = [
    { id: 1, name: "Overview", link: "/dashboard/overview/accountant", icon: Home },
    { id: 2, name: "Expense", link: "/dashboard/expense", icon: DollarSign },
    { id: 3, name: "Salary", link: "/dashboard/salary", icon: FileText },
  ];

  const WorkerMenus: MenuItem[] = [
    { id: 1, name: "Overview", link: "/dashboard/overview/worker", icon: Home },
  ];

  // Choose menus based on role
  const roleMenus: Record<string, MenuItem[]> = {
    admin: AdminMenus,
    manager: ManagerMenus,
    accountant: AccountantMenus,
    worker: WorkerMenus,
  };

  const menus = roleMenus[user?.role || ""] || [];

  // Set active menu based on current path
  useEffect(() => {
    const foundMenu = menus.find((m) => pathname.startsWith(m.link));
    if (foundMenu) setActiveMenu(foundMenu.name);
  }, [pathname, menus]);

  // Check current user
  useEffect(() => {
    const checkAuth = async () => {
      await checkCurrentUser();
    };
    checkAuth();
  }, [checkCurrentUser]);

  if (!user || isLoading) return <SidebarSkeleton />;

  return (
    <div className="dark:bg-[#1b3d2e] bg-green-900 text-gray-300 h-screen w-full flex flex-col p-5">
      <h1 className="text-white text-3xl font-semibold mb-4">
        Pure Agro Industries
      </h1>

      <Separator className="bg-gray-400 my-4" />

      <ul className="flex-1 overflow-y-auto space-y-3">
        {menus.map((menu) => {
          const Icon = menu.icon;
          const isActive = menu.name === activeMenu;

          return (
            <li key={menu.id}>
              <Link
                href={menu.link}
                onClick={() => setActiveMenu(menu.name)}
                className={`
                  flex items-center justify-between w-full px-4 py-2 rounded-lg
                  ${isActive ? "bg-green-700 text-white font-medium" : "hover:bg-green-800 hover:text-white"}
                  transition-colors duration-200
                `}
              >
                <span className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  {menu.name}
                </span>
                {isActive && <ChevronRight size={16} className="text-white" />}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-auto pt-4">
        <Separator className="bg-gray-400 my-4" />
        <div className="flex items-center gap-2 px-4 py-2 bg-green-800/70 rounded-lg">
          <User />
          <span className="text-green-100 font-medium text-sm">
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

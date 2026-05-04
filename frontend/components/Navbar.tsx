"use client";

import { useEffect } from "react";
import NavbarRightPart from "./NavbarRightPart";
import NavbarSkeleton from "./skeletons/NavbarSkeleton";
import { useAuthStore } from "@/stores/authStore";

const Navbar = () => {
  const { user, isLoading, checkCurrentUser } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      await checkCurrentUser();
    };
    fetchUser();
  }, [checkCurrentUser]);

  if ( !user || isLoading) return <NavbarSkeleton />;

  return (
    <div className="flex items-center justify-between shadow-sm p-2">
      <h1 className="text-3xl font-semibold uppercase">
        {user?.role || "User"} Dashboard
      </h1>
      <div>
        <NavbarRightPart name={user?.name || ""} image={user?.image || ""} />
      </div>
    </div>
  );
};

export default Navbar;

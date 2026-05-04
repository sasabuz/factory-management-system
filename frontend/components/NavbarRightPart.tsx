"use client";

import { Loader2Icon, LogOut, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ThemeSwitch } from "./ui/theme-switch";
import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";
import Modal from "./ui/modal";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const NavbarRightPart = ({ name, image }: { name: string; image: string }) => {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const { logout, loggingOut } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    setIsLogoutOpen(false); 
    router.push("/login"); 
    toast.success("Logged out successfully!");
  };

  return (
    <div className="flex items-center gap-3">
      {/* dark mood */}
      <div>
        <ThemeSwitch
          modes={["light", "dark"]}
          icons={[
            <Sun key="sun-icon" size={16} />,
            <Moon key="moon-icon" size={16} />,
          ]}
          showInactiveIcons="none"
        />
      </div>
      {/* Name and Avatar */}
      <div className="flex items-center justify-end gap-3 p-2 rounded-lg ">
        {/* name */}
        <div className="flex flex-col text-right">
          <h1 className="text-md font-semibold text-gray-900 dark:text-gray-100 uppercase">
            {name}
          </h1>
          <span className="text-sm text-green-500 dark:text-green-400 font-medium">
            Online
          </span>
        </div>

        {/* Avatar on the right */}
        <div className="w-12 h-12 relative">
          <Avatar className="w-full h-full" variant="close-friends">
            <AvatarImage
              src={image || "/profile-image.png"}
              alt={name}
              className="w-full h-full object-cover"
            />
            <AvatarFallback>PAI</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Logout button*/}
      <div>
        <Button
          className="hover:cursor-pointer bg-red-600 hover:cursor-pointer hover:bg-red-700 dark:bg-red-800 dark:hover:bg-red-700 text-white"
          onClick={() => setIsLogoutOpen(true)}
          variant="destructive"
        >
          {" "}
          <LogOut /> Logout
        </Button>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        title="Confirm Logout"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <svg
                className="h-10 w-10 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Logout Confirmation
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to logout? You will need to sign in again
                to access your account.
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button className="hover:cursor-pointer" onClick={() => setIsLogoutOpen(false)} variant="secondary">
              Stay Logged In
            </Button>
            <Button
              disabled={loggingOut}
              onClick={handleLogout}
              variant="default"
              className="bg-orange-500 hover:cursor-pointer hover:bg-orange-600"
            >
              {loggingOut ? (
                <div className="flex items-center">
                  {" "}
                  Loading <Loader2Icon className="animate-spin"></Loader2Icon>{" "}
                </div>
              ) : (
                <div>Logout</div>
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NavbarRightPart;

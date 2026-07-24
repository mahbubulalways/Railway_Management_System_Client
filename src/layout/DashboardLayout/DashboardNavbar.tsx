"use client";
import { logOutUserFromSystem } from "@/service/logOutFromTheSystem";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import {
  FiMenu,
  FiBell,
  FiMessageSquare,
  FiMail,
  FiChevronDown,
} from "react-icons/fi";
import { LogoutOverlay } from "./LogoutOverlay";

const AdminDashboardNavbar = ({
  setSidebarOpen,
}: {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [logout, setLogout] = useState(false);
  const router = useRouter();
  const handleLogout = () => {
    logOutUserFromSystem();
    setLogout(true);
    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  return (
    <header
      className="
      h-16
      bg-[#006A4E]
      shadow-sm
      sticky
      top-0
      z-30
      flex
      items-center
      justify-between
      px-4
      "
    >
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden text-white"
      >
        <FiMenu size={25} />
      </button>

      <div></div>

      <div className="flex items-center gap-5">
        {/* Mail icon */}
        <button className="relative text-white">
          <FiMail size={21} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            2
          </span>
        </button>

        {/* Message icon */}
        <button className="relative text-white">
          <FiMessageSquare size={21} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            5
          </span>
        </button>

        {/* Notification bell */}
        <button className="relative text-white">
          <FiBell size={21} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        {/* Profile avatar */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center font-bold">
              A
            </div>
            <FiChevronDown className="text-white hidden sm:block" size={16} />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg py-2 text-sm text-gray-700">
              <p className="px-4 py-1 font-medium">Admin User</p>
              <p className="px-4 py-1 text-xs text-gray-400">Super Admin</p>
              <hr className="my-1" />
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
      {logout && <LogoutOverlay />}
    </header>
  );
};

export default AdminDashboardNavbar;

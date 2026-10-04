import {
  IconBell,
  IconMenu2,
  IconShieldCheck,
  IconUserCircle,
} from "@tabler/icons-react";
import { useContext } from "react";
import { UIContext } from "../context/UIContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const storeOwnerName = "Store Owner";
  const navigate = useNavigate();
  const { sidebarOpen, toggleSidebar } = useContext(UIContext);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 h-18 border-b border-slate-200 bg-slate-900 backdrop-blur-md">
      <div className="grid h-full grid-cols-[auto_1fr_auto] items-center px-4 sm:px-6 lg:px-10">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {/* Mobile Sidebar Button */}
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Open sidebar"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white/95 transition-colors duration-200 hover:bg-slate-100 hover:text-white/95 focus:outline-none focus:ring-2 focus:ring-slate-300 md:hidden"
          >
            <IconMenu2 size={28} stroke={2} />
          </button>

          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">
              <IconShieldCheck size={24} stroke={2} />
            </div>

            <span className="text-lg  font-bold tracking-wide text-white/95">
              ADMIN
            </span>
          </div>
        </div>

        {/* Center Section */}
        <div className="min-w-0" />

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notifications */}
          <button
            type="button"
            onClick={() => {
              navigate("notification");
            }}
            aria-label="View notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-white/95 transition-colors duration-200 hover:bg-slate-100 hover:text-white/95 focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            <IconBell size={21} stroke={2} />

            <span
              aria-label="3 unread notifications"
              className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white/95 ring-2 ring-white"
            >
              3
            </span>
          </button>

          {/* Divider */}
          <div className="hidden h-7 w-px bg-slate-200 sm:block" />

          {/* Store Owner */}
          <button
            type="button"
            aria-label="Open store owner menu"
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors duration-200 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300 sm:px-3"
          >
            <IconUserCircle size={30} stroke={1.8} className="text-white/95" />

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold leading-5 text-white/95">
                {storeOwnerName}
              </p>

              <p className="text-xs leading-4 text-white/80">Store Owner</p>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}

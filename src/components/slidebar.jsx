import {
  IconShieldCheck,
  IconAd,
  IconBox,
  IconLayoutDashboard,
  IconPackage,
  IconPlus,
  IconUserCircle,
  IconLogout2,
  IconCategoryPlus,
  IconTexture,
  IconPalette,
  IconPlugX,
} from "@tabler/icons-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UIContext } from "../context/UIContext";
import { AuthContext } from "../context/AuthContext";
import { logout } from "../modules/auth/api/authApi";

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useContext(UIContext);
  const { authenticated } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: IconLayoutDashboard,
    },
    {
      label: "Orders",
      path: "orders",
      icon: IconBox,
    },
    {
      label: "Products",
      path: "products",
      icon: IconPackage,
    },
    {
      label: "Add Product",
      path: "product/add",
      icon: IconPlus,
    },
    {
      label: "Manage Ads",
      path: "banners",
      icon: IconAd,
    },
    {
      label: "Add Category",
      path: "addCategory",
      icon: IconCategoryPlus,
    },
    {
      label: "Add Material",
      path: "addMaterial",
      icon: IconTexture,
    },
    {
      label: "Add Color",
      path: "addColor",
      icon: IconPalette,
    },
    {
      label: "Add Plugins",
      path: "plugins",
      icon: IconPlugX,
    },
    {
      label: "Profile",
      path: "profile",
      icon: IconUserCircle,
    },
  ];

  // ===== Help for find the location path =====
  const isOnDashboard = location.pathname === "/admin/dashboard";
  const handleNavClick = (e, path) => {
    e.preventDefault();
    navigate(path, { replace: !isOnDashboard });
    toggleSidebar();
  };

  // ===== Logout Button =====
  const handleLogoutClick = async (event) => {
    event.preventDefault();
    try {
      const result = await logout();
      alert(result.data.message);
      localStorage.setItem("isLoggedIn", "false");
      authenticated();
    } catch (error) {
      console.log("Login failed: ", error);
    }
  };

  return (
    <aside
      className={`fixed left-0 top-18 z-40 h-[calc(100vh-4.5rem)] w-64 border-r border-slate-200 bg-slate-900 transition-transform duration-300 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="flex h-full flex-col">
        {/* Sidebar Header */}
        <div className="border-b border-slate-100 px-5 py-4 flex justify-center items-center gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-white/95">
              Admin Panel
            </p>

            <h2 className="mt-1 text-base font-semibold text-white/95">
              Store Management
            </h2>
          </div>
          <div className="text-white">
            <IconShieldCheck size={36} stroke={2} />
          </div>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Admin navigation"
          className="flex-1 overflow-y-auto px-4 py-4 [&::-webkit-scrollbar]:hidden" // scrollbar hidden needed
        >
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end
                  onClick={(e) => handleNavClick(e, item.path)}
                  className={({ isActive }) =>
                    `group flex w-full items-center gap-3 rounded-xl px-3 py-3.5 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-white hover:bg-slate-100 hover:text-slate-900"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={20}
                        strokeWidth={isActive ? 2 : 1.8}
                        className={`shrink-0 ${
                          isActive
                            ? "text-slate-900"
                            : "text-white group-hover:text-slate-900"
                        }`}
                      />

                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-slate-100 px-4">
          <div className="rounded-xl bg-slate-900 px-3 py-3">
            <p className="text-[15px] font-medium text-white">
              Store Administration
            </p>

            <button
              className="mt-2 truncate text-sm font-semibold text-white px-3 py-1 border rounded-[8px] flex justify-center item-center gap-1"
              onClick={handleLogoutClick}
            >
              <span className="text-[12px]">Logout</span>
              <span>
                <IconLogout2 size={18} stroke={2} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

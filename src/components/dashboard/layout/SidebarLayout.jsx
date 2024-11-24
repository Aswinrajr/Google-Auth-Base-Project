/* eslint-disable react/prop-types */
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  Home,
  Users,
  MonitorSmartphone,
  Building2,
  FileEdit,
  HelpCircle,
  Globe2, // Icon for "Domain"
} from "lucide-react";

const SidebarItem = ({ icon: Icon, title, isActive, path }) => {
  return (
    <Link to={path} className="cursor-pointer px-2">
      <div
        className={`aspect-square flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ease-in-out
          hover:bg-pink-50 hover:text-primary hover:border-primary
          ${
            isActive
              ? "bg-pink-50 text-primary border-primary"
              : "text-gray-600 border-transparent"
          }
          border-2`}
      >
        <Icon className="w-7 h-7 mb-2" />
        <span className="text-xs font-medium text-center leading-tight">
          {title}
        </span>
      </div>
    </Link>
  );
};

const SidebarLayout = ({ role }) => {
  const location = useLocation();

  // Define all sidebar items
  const allSidebarItems = [
    { icon: Home, title: "Home", path: "/dashboard" },
    { icon: Users, title: "Users", path: "/users" },
    { icon: MonitorSmartphone, title: "Requests", path: "/req-list-table" },
    { icon: Building2, title: "Vendors", path: "/vendor-list-table" },
    { icon: FileEdit, title: "Supports", path: "/supports" },
    { icon: FileEdit, title: "Entities", path: "/entities" },
    { icon: Users, title: "Employees", path: "/employees" },
    { icon: HelpCircle, title: "Question(s)", path: "/questions" },
    { icon: Globe2, title: "Domain", path: "admin/domain-table" }, 
  ];

  // Filter items based on role
  const sidebarItems =
    role === "user" || role === "employee"
      ? allSidebarItems.filter((item) =>
          ["Home", "Requests", "Supports", "Question(s)"].includes(item.title)
        )
      : allSidebarItems;

  // Match the current route to highlight active items
  const activeItem = sidebarItems.find((item) => item.path === location.pathname);

  return (
    <div className="flex">
      {/* Main Sidebar */}
      <div className="w-32 h-screen bg-white border-r border-gray-200 flex flex-col py-6">
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 gap-2">
            {sidebarItems.map((item, index) => (
              <SidebarItem
                key={index}
                icon={item.icon}
                title={item.title}
                path={item.path}
                isActive={activeItem?.path === item.path}
              />
            ))}
          </div>
        </div>
      </div>

  
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default SidebarLayout;

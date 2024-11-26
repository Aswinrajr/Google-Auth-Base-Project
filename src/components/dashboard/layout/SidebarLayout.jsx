/* eslint-disable react/prop-types */
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  Home,
  Users,
  MonitorSmartphone,
  Building2,
  FileEdit,
  HelpCircle,
  FileText, // For Documents / File Manager
  LogOut,   // For Logout
} from "lucide-react";
import TopBar from "./TopBar";

// SidebarItem component
const SidebarItem = ({ icon: Icon, title, isActive, path }) => {
  return (
    <Link to={path} className="cursor-pointer px-2">
      <div
        className={`aspect-square flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ease-in-out
          hover:bg-primary hover:text-white hover:border-primary
          ${isActive ? "bg-primary text-white border-primary" : "text-gray-600 border-transparent"}`}
      >
        <Icon className="w-7 h-7 mb-2" />
        <span className="text-xs font-medium text-center leading-tight">
          {title}
        </span>
      </div>
    </Link>
  );
};

// SidebarLayout component
const SidebarLayout = ({ role }) => {
  const location = useLocation();

  // Define sidebar items for Admin
  const allSidebarItems = [
    { icon: Home, title: "Dashboard", path: "/dashboard" },
    { icon: MonitorSmartphone, title: "Requests", path: "/req-list-table" },
    { icon: FileEdit, title: "Entities", path: "/entities" },
    { icon: Users, title: "Employees", path: "/employee-reg" },
    { icon: Building2, title: "Vendors", path: "/vendor-list-table" },
    { icon: FileText, title: "Documents / File Manager", path: "/file-manager" }, // Added File Manager
    { icon: HelpCircle, title: "Questions", path: "/questions" },
    { icon: LogOut, title: "Logout", path: "/logout" }, // Added Logout
  ];

  // Since this is for Admin, we don't need role-based filtering in this case.
  const sidebarItems = allSidebarItems;

  // Find the active item based on the current location
  const activeItem = sidebarItems.find((item) => {
    // Check if the current path starts with the sidebar item's path
    return location.pathname.startsWith(item.path);
  });

  return (
    <>
      <TopBar />
      <div className="flex flex-col sm:flex-row">
        {/* Sidebar */}
        <div className="w-full sm:w-32 h-16 sm:h-screen bg-white border-t sm:border-r border-gray-200 flex sm:flex-col sm:py-6">
          <div className="flex-1 overflow-y-auto flex sm:flex-col justify-around sm:justify-start">
            <div className="grid grid-cols-5 sm:grid-cols-1 gap-2">
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

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-8 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default SidebarLayout;

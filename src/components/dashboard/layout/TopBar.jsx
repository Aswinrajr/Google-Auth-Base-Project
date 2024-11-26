import { Link } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import capillary_logo from "../../../assets/images/capilary_logo.png";

const TopBar = () => {
  return (
    <div className="bg-white shadow-md px-4 sm:px-6 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/dashboard" className="mr-4 sm:mr-6">
          <img
            src={capillary_logo}
            alt="Capillary Logo"
            className="h-12 w-auto sm:h-16"
          />
        </Link>
        <h1 className="text-sm sm:text-lg font-semibold">
          Capillary Technologies
        </h1>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4 ml-auto">
        {/* Three dots (MoreVertical) positioned on the right */}
        <div className="bg-gray-100 rounded-full px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 cursor-pointer">
          Account
        </div>
        <MoreVertical className="text-gray-500 cursor-pointer" />
      </div>
    </div>
  );
};

export default TopBar;

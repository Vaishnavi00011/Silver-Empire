import React from "react";
import { FiMenu } from "react-icons/fi";
import Logo from "../assets/Logo/PNG-01-01-e1741102611213 (1) 1.png"
const DashboardHeader = ({ toggleSidebar }) => {
  return (
    <header className="flex items-center h-[11.7vh] w-full justify-between bg-gray-900 text-white px-6 py-4 shadow-md">
      {/* Left: Page Title */}
      <img src={Logo} className="w-14 h-12 object-contain"></img>

      {/* Right: Hamburger / Sidebar toggle + optional avatar */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-white text-xl focus:outline-none p-2 rounded hover:bg-gray-800 transition"
        >
          <FiMenu />
        </button>

        {/* Optional: User Avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-700">
          <img
            src="https://i.pravatar.cc/100"
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

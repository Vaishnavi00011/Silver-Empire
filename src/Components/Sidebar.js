import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiBox,
  FiShoppingBag,
  FiUsers,
  FiChevronDown,
  FiChevronUp,
  FiMenu,
  FiX
} from "react-icons/fi";

const Sidebar = () => {
  const [openProducts, setOpenProducts] = useState(false);
  const [isOpen, setIsOpen] = useState(true); // Sidebar open/close

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } h-screen bg-gray-900 text-white flex flex-col shadow-lg transition-all duration-300`}
    >
      {/* Header with Toggle and Admin Panel text */}
      <div className="flex items-center px-6 py-6 border-b border-gray-700">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-xl focus:outline-none mr-3"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
        {isOpen && <h1 className="text-lg font-bold">Admin Panel</h1>}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 p-4">
        {/* Dashboard */}
        <Link
          to="/dashboard"
          className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-800 transition"
        >
          <FiHome /> {isOpen && "Dashboard"}
        </Link>

        {/* Products Dropdown */}
        <button
          onClick={() => setOpenProducts(!openProducts)}
          className="flex items-center justify-between p-3 rounded-md hover:bg-gray-800 transition"
        >
          <span className="flex items-center gap-3">
            <FiBox /> {isOpen && "Products"}
          </span>
          {openProducts ? <FiChevronUp /> : <FiChevronDown />}
        </button>

        {/* Products Submenu (only Add + List) */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            openProducts ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {isOpen && (
            <ul className="ml-6 mt-2 flex flex-col gap-2 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-3 shadow-inner">
              <li>
                <Link
                  to='/add-product'
                  className="block p-2 rounded-md text-sm hover:bg-indigo-600"
                >
                  ➕ Add Product
                </Link>
              </li>
              <li>
                <Link
                  to='/product-list'
                  className="block p-2 rounded-md text-sm hover:bg-indigo-600"
                >
                  📋 Product List
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* Orders */}
        <Link
          to="/orders"
          className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-800 transition"
        >
          <FiShoppingBag /> {isOpen && "Orders"}
        </Link>

        {/* Users */}
        <Link
          to="/users"
          className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-800 transition"
        >
          <FiUsers /> {isOpen && "Users"}
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;

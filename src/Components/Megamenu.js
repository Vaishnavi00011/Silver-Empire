// src/Components/MegaMenu.js
import React, { useState } from "react";
import { motion } from "framer-motion";

const MegaMenu = ({ items }) => {
  const [hoveredImage, setHoveredImage] = useState(items[0]?.image);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="absolute top-full left-0 mt-2 w-[600px] bg-white text-gray-900 rounded-lg shadow-xl border border-gray-200 z-50"
    >
      <div className="flex p-5">
        {/* Left side - Subcategories */}
        <ul className="flex-1 space-y-3">
          {items.map((item) => (
            <li
              key={item.name}
              onMouseEnter={() => setHoveredImage(item.image)}
              className="cursor-pointer hover:text-red-600 transition-colors duration-300"
            >
              {item.name}
            </li>
          ))}
        </ul>

        {/* Right side - Image */}
        <div className="w-[220px] h-[220px] ml-6 rounded-lg overflow-hidden shadow-md">
          <img
            src={hoveredImage}
            alt="Preview"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default MegaMenu;

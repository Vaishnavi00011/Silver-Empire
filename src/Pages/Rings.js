import React, { useState } from "react";
import { motion } from "framer-motion";
import ring from "../assets/Images/Mask group (5).png";
import ring2 from "../assets/Images/2.png";
import ring3 from "../assets/Images/1.svg";
import ring4 from "../assets/Images/3.svg";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import banner from "../assets/Images/jewellry proposal_20250926_223349_0000.png";
import { Link } from "react-router-dom";

const rings = [
  { id: 1, name: "Classic Silver Ring", price: "₹2,500", metal: "Silver", image: ring },
  { id: 2, name: "Elegant Silver Ring", price: "₹3,200", metal: "Silver", image: ring2 },
  { id: 3, name: "Modern Silver Ring", price: "₹2,800", metal: "Silver", image: ring3 },
  { id: 4, name: "Vintage Silver Ring", price: "₹3,500", metal: "Silver", image: ring4 },
];

const filterOptions = {
  "Product type": ["Ring", "Earring", "Necklace", "Bracelet"],
  Price: ["Under ₹2,000", "₹2,000 - ₹3,000", "Above ₹3,000"],
  "Shop For": ["Men", "Women", "Kids"],
  Color: ["Silver", "Gold", "Rose Gold"],
  Stone: ["Diamond", "Ruby", "Emerald"],
  Style: ["Classic", "Modern", "Vintage"],
  "Sub Category": ["Engagement", "Wedding", "Casual"],
};

const RingsCollection = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleSelect = (filter, option) => {
    console.log(`Selected ${option} for ${filter}`);
    setOpenDropdown(null);
  };

  return (
    <div className="bg-white font-sans">
      <Header />

      {/* Banner */}
      <div className="w-full h-48 sm:h-72 md:h-96 lg:h-[450px] relative overflow-hidden rounded-b-3xl">
        <img
          src={banner}
          alt="Jewellery Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-6 flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between gap-3 bg-white rounded-lg shadow-sm">
        <div className="flex flex-wrap items-start gap-2 md:gap-4 text-gray-800 font-medium">
          {Object.keys(filterOptions).map((filter) => (
            <div key={filter} className="relative">
              <button
                onClick={() => toggleDropdown(filter)}
                className="px-2 py-1 sm:px-3 sm:py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition text-xs sm:text-sm whitespace-nowrap"
              >
                {filter} <span className="ml-1 text-xs">▾</span>
              </button>

              {openDropdown === filter && (
                <div className="absolute top-full left-0 mt-1 w-36 sm:w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50 text-xs sm:text-sm">
                  {filterOptions[filter].map((option) => (
                    <div
                      key={option}
                      className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelect(filter, option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 text-gray-800 font-medium mt-2 md:mt-0 text-xs sm:text-sm">
          <span>Sort by:</span>
          <select className="border border-gray-300 rounded-md px-2 py-1 hover:border-gray-500 transition text-xs sm:text-sm">
            <option>Featured</option>
            <option>Popularity</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Cards Grid */}
      <Link to={"/rings-product"}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 
                        grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {rings.map((ring, index) => (
            <motion.div
              key={ring.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-black border border-gray-200 rounded-xl shadow-md overflow-hidden flex flex-col bg-white"
            >
              {/* Responsive Image height */}
              <div className="h-40 sm:h-56 md:h-64 overflow-hidden">
                <img
                  src={ring.image}
                  alt={ring.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Responsive Text */}
              <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-xs sm:text-sm md:text-base">
                    {ring.metal}
                  </span>
                  <span className="font-bold text-xs sm:text-sm md:text-base">
                    {ring.price}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base md:text-sm font-semibold mt-2">
                  {ring.name}
                </h3>

                <button className="mt-3 sm:mt-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-black text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-gray-900 transition">
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </Link>

      <Footer />
    </div>
  );
};

export default RingsCollection;

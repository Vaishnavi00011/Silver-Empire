import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

const filterOptions = {
  "Product type": ["Bracelet", "Ring", "Necklace", "Earring"],
  Price: ["Under ₹2,000", "₹2,000 - ₹3,000", "Above ₹3,000"],
  "Shop For": ["Men", "Women", "Kids"],
  Color: ["Silver", "Gold", "Rose Gold"],
  Stone: ["Diamond", "Ruby", "Emerald"],
  Style: ["Classic", "Modern", "Vintage"],
  "Sub Category": ["Engagement", "Wedding", "Casual"],
};

const BraceletsCollection = () => {
  const [bracelets, setBracelets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleSelect = (filter, option) => {
    console.log(`Selected ${option} for ${filter}`);
    setOpenDropdown(null);
  };

  // ✅ Fetch only "Bracelets" products from API
  useEffect(() => {
    const fetchBracelets = async () => {
      try {
        const res = await axios.get("http://91.108.105.41:8000/api/products/");
        const allProducts = res.data.results || [];

        // Filter only category_name === "Bracelets"
        const braceletData = allProducts.filter(
          (item) =>
            item.category_name &&
            item.category_name.toLowerCase() === "bracelets"
        );

        setBracelets(braceletData);
      } catch (error) {
        console.error("Error fetching bracelets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBracelets();
  }, []);

  return (
    <div className="bg-white font-sans">
      <Header />

      {/* Banner */}
      <div className="w-full h-48 sm:h-72 md:h-96 lg:h-[450px] relative overflow-hidden rounded-b-3xl flex items-center justify-center bg-gray-100">
        <span className="text-gray-400 text-sm sm:text-base">
          Banner Image Here
        </span>
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

      {/* Loading / Empty / Cards */}
      {loading ? (
        <p className="text-center text-gray-500 py-10">Loading products...</p>
      ) : bracelets.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          No bracelets available right now.
        </p>
      ) : (
        <Link to={"/bracelets-product"}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {bracelets.map((bracelet, index) => (
              <motion.div
  key={bracelet.id}
  className="border border-gray-300 rounded-lg overflow-hidden bg-white text-black shadow-sm"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.6 }}
>
  {/* Image */}
  <div className="w-full h-72 overflow-hidden relative flex items-center justify-center bg-gray-50">
    <img
      src={
        bracelet.primary_image && bracelet.primary_image.image
          ? `http://91.108.105.41:8000${bracelet.primary_image.image}`
          : "/fallback-image.png"
      }
      alt={bracelet.name}
      className="w-full h-full object-cover"
    />

    {/* Optional Discount Badge */}
    {bracelet.discount_percentage > 0 && (
      <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
        {bracelet.discount_percentage.toFixed(0)}% OFF
      </span>
    )}
  </div>

  {/* Content */}
  <div className="p-3 flex flex-col justify-between h-32">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1">
      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
        {bracelet.name}
      </h3>
      <div className="flex items-center gap-2 mt-1 sm:mt-0">
        <span className="font-bold text-gray-900 text-sm sm:text-base">
          ₹{bracelet.current_price}
        </span>
        {parseFloat(bracelet.base_price) > bracelet.current_price && (
          <span className="text-gray-500 text-xs sm:text-sm line-through">
            ₹{bracelet.base_price}
          </span>
        )}
      </div>
    </div>

    <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">
      {bracelet.short_description || "Stylish bracelet to enhance your look."}
    </p>

    <button
      className="w-full bg-black text-white text-sm px-2 py-2 rounded-md hover:bg-gray-800 transition"
      onClick={() => console.log(`Added ${bracelet.name} to cart`)}
    >
      Add to Cart
    </button>
  </div>
</motion.div>

            ))}
          </div>
        </Link>
      )}

      <Footer />
    </div>
  );
};

export default BraceletsCollection;

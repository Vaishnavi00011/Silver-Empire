import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import axios from "axios";

const filterOptions = {
  "Product type": ["Ring", "Earring", "Necklace", "Bracelet"],
  Price: ["Under ₹2,000", "₹2,000 - ₹3,000", "Above ₹3,000"],
  "Shop For": ["Men", "Women", "Kids"],
  Color: ["Silver", "Gold", "Rose Gold"],
  Stone: ["Diamond", "Ruby", "Emerald"],
  Style: ["Classic", "Modern", "Daily Wear"],
  "Sub Category": ["Engagement", "Wedding", "Casual"],
};

const Collection = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  // Navigate on click → har category ka apna page
  const handleSelect = (category) => {
    setOpenDropdown(null);
    navigate(`/collection/${category.id}`); // ID-based navigation
  };

  // ================= GET DATA USING AXIOS =================
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://91.108.105.41:8000/api/categories/");
      console.log("API Response:", response.data);

      setCategories(Array.isArray(response.data.results) ? response.data.results : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="bg-white font-sans">
      <Header />

      {/* Banner */}
      <div className="w-full h-48 sm:h-72 md:h-96 lg:h-[450px] relative overflow-hidden rounded-b-3xl flex items-center justify-center bg-gray-100">
        <span className="text-gray-400 text-sm sm:text-base">Collection Banner Placeholder</span>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-white rounded-lg shadow-sm">
        <div className="flex flex-wrap items-start gap-2 md:gap-4 text-gray-800 font-medium">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleSelect(category)}
              className="px-2 py-1 sm:px-3 sm:py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition text-xs sm:text-sm whitespace-nowrap"
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      {loading ? (
        <div className="text-center text-gray-500 py-10">Loading...</div>
      ) : (
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 
                     grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {categories.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-black border border-gray-200 rounded-xl shadow-md overflow-hidden flex flex-col bg-white cursor-pointer"
              onClick={() => handleSelect(item)} // click on card → navigate
            >
              {/* Product Image */}
              <div className="h-40 sm:h-56 md:h-64 overflow-hidden flex items-center justify-center bg-gray-100">
                {item.image ? (
                  <img
                    src={item.image.startsWith("http") ? item.image : `http://91.108.105.41:8000${item.image}`}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-xs sm:text-sm">No Image</span>
                )}
              </div>

              <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between">
                <h3 className="text-sm sm:text-base md:text-sm font-medium mt-2">{item.name}</h3>
                {item.description && (
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">{item.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Collection;

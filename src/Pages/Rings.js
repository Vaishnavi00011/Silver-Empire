import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import banner from "../assets/Images/jewellry proposal_20250926_223349_0000.png";
import { Link } from "react-router-dom";

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
  const [rings, setRings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://91.108.105.41:8000/api/products/");
        const onlyRings = response.data.results.filter(
          (product) => product.category_name === "Ring"
        );
        setRings(onlyRings);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rings:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleSelect = (filter, option) => {
    console.log(`Selected ${option} for ${filter}`);
    setOpenDropdown(null);
  };
  

  return (
    <div className="bg-white font-sans min-h-screen">
      <Header />

      {/* Banner */}
      <div className="w-full h-48 sm:h-72 md:h-96 lg:h-[450px] relative overflow-hidden rounded-b-3xl">
        <img
          src=""
          alt="Jewellery Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-6 flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between gap-3 bg-white rounded-lg shadow-sm border border-gray-100">
        {/* Filter Buttons */}
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

        {/* Sort Dropdown */}
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

      {/* Product Cards Grid */}
      {loading ? (
        <div className="text-center py-10 text-gray-600">Loading products...</div>
      ) : rings.length === 0 ? (
        <div className="text-center py-10 text-gray-600">No products found.</div>
      ) : (
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 
          grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {rings.map((ring, index) => (
            <motion.div
              key={ring.id}
              className="border border-gray-300 rounded-lg overflow-hidden bg-white text-black shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Image */}
              <div className="w-full h-64 overflow-hidden relative">
                <img
                  src={
                    ring.primary_image && ring.primary_image.image
                      ? `http://91.108.105.41:8000${ring.primary_image.image}`
                      : "/fallback-image.png"
                  }
                  alt={ring.name}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />

                {/* Discount Badge */}
                {ring.discount_percentage > 0 && (
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                    {ring.discount_percentage.toFixed(0)}% OFF
                  </span>
                )}
              </div>

              {/* Card Content */}
              <div className="p-3 flex flex-col justify-between h-32">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-1">
                    {ring.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 sm:mt-0">
                    <span className="font-bold text-gray-900 text-sm sm:text-base">
                      ₹{ring.current_price}
                    </span>
                    {parseFloat(ring.base_price) > ring.current_price && (
                      <span className="text-gray-500 text-xs sm:text-sm line-through">
                        ₹{ring.base_price}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">
                  {ring.short_description || "Elegant jewellery to enhance your style."}
                </p>

<Link
  to={`/product/${ring.id}`}
  state={{ primaryImage: ring.primary_image }}  // <-- भेज रहे हैं primary image
>
  <button
    className="w-full bg-black text-white text-sm px-2 py-2 rounded-md hover:bg-gray-800 transition"
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  >
    View Details
  </button>
</Link>



              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default RingsCollection;

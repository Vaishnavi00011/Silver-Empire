import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

// Wishlist helper functions
const getWishlist = () => {
  const data = localStorage.getItem("wishlist");
  return data ? JSON.parse(data) : [];
};

const addToWishlist = (product) => {
  const wishlist = getWishlist();
  if (!wishlist.find((item) => item.id === product.id)) {
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
};

// Filter options
const filterOptions = {
  "Product type": ["Ring", "Earing", "Necklace", "Bracelet", "Pendant", "Gift"],
  Price: ["Under ₹2,000", "₹2,000 - ₹3,000", "Above ₹3,000"],
  "Shop For": ["Men", "Women", "Kids"],
  Color: ["Silver", "Gold", "Rose Gold"],
  Stone: ["Diamond", "Ruby", "Emerald"],
  Style: ["Classic", "Modern", "Vintage"],
  "Sub Category": ["Engagement", "Wedding", "Casual"],
};

const CategoryCollection = () => {
  const { categorySlug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [wishlist, setWishlist] = useState(getWishlist());

  // ✅ categorySlug → id mapping (for slug-based navigation)
  const categoryMap = {
    ring: 2,
    earing: 3,
    necklace: 4,
    bracelet: 5,
    pendant: 6,
    gift: 7,
  };

  // CategoryCollection.jsx में useEffect हुक को इस तरह बदलें:

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const API_URL = "http://91.108.105.41:8000/api/products/";
        const response = await axios.get(API_URL);
        const allProducts = response.data.results || []; // 1. Slug/ID को सामान्य (normalize) करें

        const normalizedSlug = categorySlug?.toLowerCase(); // 2. ID या Mapped ID प्राप्त करें

        const targetCategoryId = !isNaN(parseInt(categorySlug))
          ? parseInt(categorySlug)
          : categoryMap[normalizedSlug]; // 3. Slug से अपेक्षित Category Name बनाएं (e.g., 'ring' -> 'Ring')

        const targetCategoryName = normalizedSlug
          ? normalizedSlug.charAt(0).toUpperCase() + normalizedSlug.slice(1)
          : null; // ✅ 4. फ़िल्टरिंग लॉजिक: ID या Name (दोनों में से कोई भी) से मैच करें

        const filteredProducts = allProducts.filter((product) => {
          // A. ID से फ़िल्टर
          const matchesId =
            targetCategoryId && product.category === targetCategoryId;
          // B. Name से फ़िल्टर (ID बदलने पर यह बैकअप का काम करेगा)
          const matchesName =
            targetCategoryName && product.category_name === targetCategoryName;

          return matchesId || matchesName;
        });

        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (categorySlug) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [categorySlug]);

  const toggleDropdown = (name) =>
    setOpenDropdown(openDropdown === name ? null : name);

  const handleSelect = (filter, option) => {
    console.log(`Selected ${option} for ${filter}`);
    setOpenDropdown(null);
  };

  const handleLike = (product) => {
    addToWishlist(product);
    setWishlist(getWishlist());
  };

  const categoryName =
    products.length > 0 ? products[0].category_name : categorySlug || "Product";
  const pageTitle = categoryName + " Collection";

  return (
    <div className="bg-white font-sans">
      <Header />

      {/* Banner */}
      <div className="w-full h-48 sm:h-72 md:h-96 lg:h-[450px] relative overflow-hidden rounded-b-3xl">
        <img
          src=""
          alt="Jewellery Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wider">
            {pageTitle}
          </h1>
        </div>
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
      {loading ? (
        <div className="text-center py-10 text-gray-600">
          Loading products... ✨
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-10 text-gray-600">
          😢 Sorry, no products found for the category:{" "}
          <span className="font-semibold">{categoryName}</span> ( ID/Slug:{" "}
          {categorySlug}).
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {products.map((product) => {
            const liked = wishlist.some((item) => item.id === product.id);
            return (
              <Link key={product.id} to={`/product-info/${product.id}`}>
                <motion.div
                  className="border border-gray-300 rounded-lg overflow-hidden bg-white text-black shadow-lg transform hover:scale-[1.02] transition duration-300 ease-in-out cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Image Container */}
                  <div className="w-full overflow-hidden relative">
                    <img
                      src={
                        product.primary_image?.image
                          ? `http://91.108.105.41:8000${product.primary_image.image}`
                          : "/fallback-image.png"
                      }
                      alt={product.name}
                      className="w-full h-40 sm:h-64 object-cover"
                    />
                    {product.discount_percentage > 0 && (
                      <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                        {product.discount_percentage.toFixed(0)}% OFF
                      </span>
                    )}
                    {/* Heart Icon */}
                    <button
                      className="absolute top-2 right-2 text-red-500 text-lg sm:text-xl"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLike(product);
                      }}
                    >
                      {liked ? <FaHeart /> : <FaRegHeart />}
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-3 flex flex-col justify-between sm:h-32">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-1">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 sm:mt-0">
                        <span className="font-bold text-gray-900 text-sm sm:text-base">
                          ₹{product.current_price}
                        </span>
                        {parseFloat(product.base_price) >
                          product.current_price && (
                          <span className="text-gray-500 text-xs sm:text-sm line-through">
                            ₹{product.base_price}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">
                      {product.short_description ||
                        `Find your perfect ${
                          product.category_name || "jewellery piece"
                        } here!`}
                    </p>
                    <button className="w-full bg-black text-white text-sm px-2 py-2 rounded-md hover:bg-gray-800 transition">
                      View Details
                    </button>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CategoryCollection;

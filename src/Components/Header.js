import React, { useState, useEffect, useRef } from 'react';
import { Search, Mic, User, Store, Heart, ShoppingBag, Menu, X, Diamond, Gem, Sparkles, Clock, Star, Gift } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import Earing from "../assets/Images/Mask group (4).webp";
import Pendants from "../assets/Images/Mask group (7).webp";
import Mangalsutra from "../assets/Images/50D3PTYKEAA29_1 1 (1).webp";
import Rings from "../assets/Images/Mask group (5).webp";
import Logo from "../assets/Logo/PNG-01-01-e1741102611213 (1) 1.png";
import { Link, useNavigate } from 'react-router-dom';
import Login from "../Components/Login";
import axios from 'axios';

// Base URL for the API
const BASE_API_URL = "http://91.108.105.41:8000";
const SEARCH_API_URL = `${BASE_API_URL}/api/products/`;
const CATEGORIES_API_URL = `${BASE_API_URL}/api/categories/`;

const defaultImage = Rings;

// =========================================================================
// Categories Dropdown Component (Desktop)
// =========================================================================
const CategoriesDropdown = ({ setMenuOpen }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [hoveredImage, setHoveredImage] = useState(defaultImage);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(CATEGORIES_API_URL);
        const data = res.data.results.map(cat => ({
          id: cat.id,
          name: cat.name,
          image: cat.image ? `${BASE_API_URL}${cat.image}` : defaultImage,
        }));
        const mid = Math.ceil(data.length / 2);
        setCategories([data.slice(0, mid), data.slice(mid)]);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setMenuOpen(false);
    navigate(`/collection/${category.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="absolute top-full left-0 mt-3 max-w-xl bg-white text-gray-900 border border-gray-200 shadow-xl rounded-lg overflow-hidden z-50"
    >
      <div className="flex p-6">
        <div className="flex space-x-12 pr-6 border-r border-gray-200">
          {categories.map((section, idx) => (
            <ul key={idx} className="space-y-2 text-sm font-medium font-[Poppins] tracking-wide">
              {section.map(item => (
                <li
                  key={item.name}
                  onMouseEnter={() => setHoveredImage(item.image)}
                  onMouseLeave={() => setHoveredImage(defaultImage)}
                  onClick={() => handleCategoryClick(item)}
                  className="cursor-pointer relative transition-all duration-300 hover:text-red-700 hover:border-b-2 hover:border-red-700 whitespace-nowrap"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          ))}
        </div>
        <div className="pl-6 flex items-center justify-center">
          <motion.div
            key={hoveredImage}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-[180px] h-[220px] rounded-lg overflow-hidden shadow-md"
          >
            {hoveredImage ? (
              <img
                src={hoveredImage}
                alt="Jewelry Example"
                className="w-full h-full object-cover transition-all duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Hover a category
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// =========================================================================
// Search Dropdown Component (Desktop/Mobile)
// =========================================================================
const SearchDropdown = ({ searchResults, onResultClick, searchValue, isMobile = false }) => {
  const handleAllResultsClick = () => {
    onResultClick({ name: searchValue, type: 'view_all' }); 
  };

  if (searchResults.length === 0) {
    if (searchValue.trim() !== "") {
       return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className={`absolute top-full w-full mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl p-4 text-center text-sm text-gray-400 z-40 ${isMobile ? 'static mt-0 border-t-0 rounded-t-none' : ''}`}
        >
          No products found for "{searchValue}"
        </motion.div>
      );
    }
    return null;
  }

  const containerClasses = isMobile 
    ? "static w-full mt-0 border-t-0 rounded-t-none" 
    : "absolute top-full w-full mt-1";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className={`${containerClasses} bg-gray-900 border border-gray-700 rounded-lg shadow-2xl overflow-hidden z-40 max-h-80 overflow-y-auto custom-scroll`}
    >
      <ul className="divide-y divide-gray-800">
        {searchResults.slice(0, 8).map(product => (
          <li
            key={product.id}
            className="flex items-center p-3 cursor-pointer hover:bg-gray-800 transition-colors duration-200"
            onClick={() => onResultClick(product)}
          >
            <img
              src={product.primary_image?.image ? `${BASE_API_URL}${product.primary_image.image}` : defaultImage}
              alt={product.name}
              className="w-10 h-10 object-cover rounded mr-3 flex-shrink-0 border border-gray-700"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-white">{product.name}</p>
              <p className="text-xs text-gray-400">
                Category: <span className="font-light">{product.category_name}</span>
              </p>
            </div>
            <span className="text-sm font-semibold text-red-400 ml-4 flex-shrink-0">
              ₹{parseFloat(product.current_price).toLocaleString('en-IN')}
            </span>
          </li>
        ))}
        {searchResults.length > 8 && (
          <li 
            className="p-3 text-center text-sm text-gray-400 hover:text-white cursor-pointer transition-colors duration-200 bg-gray-800/50 hover:bg-gray-800"
            onClick={handleAllResultsClick}
          >
            View All Results ({searchResults.length})
          </li>
        )}
      </ul>
    </motion.div>
  );
};

// =========================================================================
// Mobile Search Overlay Component
// =========================================================================
const MobileSearchOverlay = ({ isSearchOpen, setIsSearchOpen }) => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchValue("");
      setSearchResults([]);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchValue.trim() === "") {
        setSearchResults([]);
        return;
      }

      setIsSearchLoading(true);
      try {
        const res = await axios.get(`${SEARCH_API_URL}?search=${searchValue}`);
        setSearchResults(res.data.results || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
      } finally {
        setIsSearchLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchSearchResults();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  const handleSearchResultClick = (product) => {
    setIsSearchOpen(false);
    if (product.type === 'view_all') {
      navigate(`/search?query=${encodeURIComponent(product.name)}`);
    } else {
      // Assuming 'product.category' holds the category ID for navigation
      // If product doesn't have a category ID, you might need a different route or data structure.
      // Based on the desktop search logic, this seems to be for navigating to a category page,
      // but the data structure in the desktop component uses `product.category` which isn't present
      // in the example payload. Sticking to the original code's logic for now:
      // navigate(`/collection/${product.category}`); 
      // A more robust implementation might navigate to the product detail page:
      // navigate(`/product/${product.id}`);
      
      // Let's use the safer one from the mobile menu itself, which is a collection page.
      // Since the product object has `category_name`, we'll need the category ID for the route, 
      // which is typically part of the product object in the actual API response.
      // For now, let's navigate to a general search result page if no category ID is present on the product.
       if(product.category) {
           navigate(`/collection/${product.category}`);
       } else {
           // Fallback to searching all products
           navigate(`/search?query=${encodeURIComponent(product.name)}`);
       }

    }
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-gray-950/95 backdrop-blur-md z-[60] p-4 flex flex-col"
        >
          <div className="flex items-center space-x-3 pb-4 border-b border-gray-700/50">
            <div className="flex-1 flex rounded-full overflow-hidden border border-gray-300">
              <div className="bg-white px-3 py-2 flex items-center justify-center">
                <Search size={18} className="text-black" />
              </div>
              <div className="flex items-center bg-gray-950 px-3 py-2 flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search for jewelry..."
                  className="w-full bg-transparent outline-none text-sm text-white placeholder-gray-400"
                />
                {isSearchLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                ) : (
                  searchValue.length > 0 && <X size={16} className="text-gray-400 cursor-pointer" onClick={() => setSearchValue("")} />
                )}
              </div>
            </div>
            <X size={24} className="text-white cursor-pointer hover:rotate-90 transition-transform duration-300" onClick={() => setIsSearchOpen(false)} />
          </div>

          <div className="flex-1 overflow-y-auto pt-4 relative">
            <SearchDropdown
              searchResults={searchResults}
              onResultClick={handleSearchResultClick}
              searchValue={searchValue}
              isMobile={true}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// =========================================================================
// Main Header Component
// =========================================================================
const Header = () => {
  const navigate = useNavigate();
  const searchBarRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false); // State for Login modal
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileCategories, setMobileCategories] = useState([]);

  // ===== USER STATE & AUTH LOGIC (UPDATED) =====
  const [user, setUser] = useState(null);

  /**
   * Loads user data from localStorage on component mount.
   */
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        localStorage.removeItem("user"); // Clear corrupted data
    }
  }, []);

  /**
   * Handles successful login, sets user state, and stores user in localStorage.
   * @param {object} userData - The user data returned from the login process.
   */
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setOpen(false); // Close the login modal
  };

  // Static categories for search bar placeholder animation
  const staticCategories = [
    { name: 'Rings', image: Rings }, { name: 'Earrings', image: Earing },
    { name: 'Bracelets', image: Rings }, { name: 'Pendants', image: Pendants },
    { name: 'Mangalsutra', image: Mangalsutra }, { name: 'Necklaces', image: Pendants }
  ].map(i => i.name);

  // Auto-cycle the placeholder text
  useEffect(() => {
    if (searchValue === "") {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % staticCategories.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [staticCategories.length, searchValue]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Desktop Search functionality (Debounced)
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchValue.trim() === "") {
        setSearchResults([]);
        return;
      }

      setIsSearchLoading(true);
      try {
        const res = await axios.get(`${SEARCH_API_URL}?search=${searchValue}`);
        setSearchResults(res.data.results || []);
      } catch (error) {
        console.error("Error fetching desktop search results:", error);
        setSearchResults([]);
      } finally {
        setIsSearchLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchSearchResults();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  // Handle click on a desktop search result
  const handleSearchResultClick = (product) => {
    if (product.type === 'view_all') {
        navigate(`/search?query=${encodeURIComponent(product.name)}`);
    } else {
      // In a real application, you'd navigate to the product detail page: `/product/${product.id}`
      // Or to the category if that's the intended flow:
      navigate(`/collection/${product.category}`);
    }
    setSearchResults([]);
    setSearchValue("");
    setIsSearchFocused(false);
  };

  // Click outside search bar to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchBarRef]);

  // Fetch mobile categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(CATEGORIES_API_URL);
        const data = res.data.results.map(cat => ({
          id: cat.id,
          name: cat.name,
          image: cat.image ? `${BASE_API_URL}${cat.image}` : defaultImage,
        }));
        setMobileCategories(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);

  // Handle click on a mobile category link
  const handleMobileCategoryClick = (id) => {
    setIsMenuOpen(false);
    navigate(`/collection/${id}`);
  };

  return (
    <>
      {/* ================= DESKTOP HEADER ================= */}
      <header className="bg-gray-950 text-white hidden md:block">
        <div className="flex items-center justify-between px-[12%] py-2">
          <Link to={"/"}>
            <div className="flex items-center space-x-3">
              <img src={Logo} className='w-20' alt="Logo" />
            </div>
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="flex-1 max-w-md mx-8 relative" ref={searchBarRef}>
            <div className="flex rounded-full overflow-hidden border border-gray-300">
              <div className="bg-white px-4 py-2 flex items-center justify-center">
                <span className="text-black text-sm font-medium">Search</span>
              </div>
              <div className="flex items-center bg-gray-950 px-4 py-2 flex-1 relative">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Shop for "
                  className="w-full bg-transparent outline-none text-sm text-white placeholder-gray-400"
                />
                {searchValue === "" && !isSearchFocused && (
                  <div className="absolute left-[78px] top-1/2 -translate-y-1/2 text-white text-sm font-medium pointer-events-none">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={staticCategories[currentIndex]}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                      >
                        {staticCategories[currentIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                )}
                <div className="flex items-center pl-3 ml-3 border-l border-gray-500">
                  {isSearchLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Mic className="w-4 h-4 text-white cursor-pointer" />
                  )}
                </div>
              </div>
            </div>
            <AnimatePresence>
              {isSearchFocused && searchValue.trim() !== "" && (searchResults.length > 0 || isSearchLoading === false) && (
                <SearchDropdown
                  searchResults={searchResults}
                  onResultClick={handleSearchResultClick}
                  searchValue={searchValue}
                />
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center space-x-6">
            {user && user.first_name ? (
  <div
    onClick={() => navigate("/profile")}
    className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center cursor-pointer hover:opacity-80 font-semibold"
  >
    {user.first_name[0].toUpperCase()} 
  </div>
) : (
  <User onClick={() => setOpen(true)} size={22} className="cursor-pointer hover:text-gray-400" />
)}
            <Link to={'/our-store'}>
              <Store size={22} className="cursor-pointer hover:text-gray-400" />
            </Link>
            <Link to={'/wish-list'}>
              <Heart size={22} className="cursor-pointer hover:text-gray-400" />
            </Link>
            <Link to={'/add-cart'}>
              <ShoppingBag size={22} className="cursor-pointer hover:text-gray-400" />
            </Link>
          </div>
        </div>

        <nav className="border-t border-gray-700">
          <div className="relative flex items-center justify-center px-[7%] py-2.5 space-x-[7%]">
            <div className="relative">
              <div className="flex items-center space-x-2 cursor-pointer hover:text-gray-300" onClick={toggleDropdown}>
                {isDropdownOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                <span className="text-sm font-medium">Browse All Categories</span>
              </div>
              <AnimatePresence>
                {isDropdownOpen && <CategoriesDropdown setMenuOpen={setIsDropdownOpen} />}
              </AnimatePresence>
            </div>

            <div className="flex space-x-20">
              <Link to={'/collection/ring'}>
                <div className="flex items-center space-x-1.5 text-sm font-medium hover:text-gray-300 cursor-pointer">
                  <Diamond className="w-4 h-4" />
                  <span>Rings</span>
                </div>
              </Link>

              <Link to={'/collection/earing'}>
                <div className="flex items-center space-x-1.5 text-sm font-medium hover:text-gray-300 cursor-pointer">
                  <Gem className="w-4 h-4" />
                  <span>Earrings</span>
                </div>
              </Link>

              <Link to={'collection/bracelets'}>
                <div className="flex items-center space-x-1.5 text-sm font-medium hover:text-gray-300 cursor-pointer">
                  <Sparkles className="w-4 h-4" />
                  <span>Bracelets</span>
                </div>
              </Link>

              <Link to={'/daily-wear'}>
                <div className="flex items-center space-x-1.5 text-sm font-medium hover:text-gray-300 cursor-pointer">
                  <Clock className="w-4 h-4" />
                  <span>Daily wear</span>
                </div>
              </Link>

              <Link to={"/collection"}>
                <div className="flex items-center space-x-1.5 text-sm font-medium hover:text-gray-300 cursor-pointer">
                  <Star className="w-4 h-4" />
                  <span>Collection</span>
                </div>
              </Link>

              <Link to={"/collection/gift"}>
                <div className="flex items-center space-x-1.5 text-sm font-medium hover:text-gray-300 cursor-pointer">
                  <Gift className="w-4 h-4" />
                  <span>Gifts</span>
                </div>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Login Modal (Shared) */}
      {open && <Login setOpen={setOpen} onLoginSuccess={handleLoginSuccess} />}

      {/* ================= MOBILE HEADER ================= */}
      <div className="bg-gray-950 text-white md:hidden relative">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            <div onClick={toggleMenu} className="cursor-pointer">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
            <Link to={"/"}>
              <img src={Logo} className="w-16 sm:w-20" alt="Logo" />
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <Search size={20} className="cursor-pointer" onClick={() => setIsMobileSearchOpen(true)} />
           {user && user.first_name ? (
  <div
    onClick={() => navigate("/profile")}
    className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center cursor-pointer hover:opacity-80 font-semibold text-sm"
  >
    {user.first_name[0].toUpperCase()} 
  </div>
) : (
  <User size={18} className="cursor-pointer hover:text-gray-400" onClick={() => setOpen(true)} />
)}
            <Link to={"/our-store"}>
              <Store size={18} className="cursor-pointer hover:text-gray-400" />
            </Link>
            <Link to={"/wish-list"}>
              <Heart size={18} className="cursor-pointer hover:text-gray-400" />
            </Link>
            <Link to={"/add-cart"}>
              <ShoppingBag size={18} className="cursor-pointer hover:text-gray-400" />
            </Link>
          </div>
        </div>

        {/* Mobile Menu Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-[80%] sm:w-[300px]
          bg-black/90 backdrop-blur-xl text-white z-50 shadow-[0_0_25px_rgba(255,255,255,0.1)]
          border-r border-gray-700/40 transform transition-transform duration-500 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex justify-end p-4 border-b border-gray-700/40">
            <X
              size={26}
              className="cursor-pointer text-gray-400 hover:text-white hover:rotate-90 hover:scale-110 transition-all duration-500"
              onClick={toggleMenu}
            />
          </div>

          <div className="px-6 py-5 border-b border-gray-700/40 relative">
            <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
              <span className="bg-gradient-to-r from-gray-200 via-white to-gray-400 bg-clip-text text-transparent drop-shadow-sm">
                All Categories
              </span>
            </h2>
            <div className="absolute bottom-0 left-6 w-28 h-[3px] bg-gradient-to-r from-gray-500 via-white to-gray-500 rounded-full animate-[shimmer_2s_infinite]" />
          </div>

          <div className="px-6 py-6 overflow-y-auto h-[calc(100%-128px)] custom-scroll flex flex-col gap-3">
            {mobileCategories.map((item) => (
              <div
                key={item.id}
                onClick={() => handleMobileCategoryClick(item.id)}
                className="flex items-center gap-4 cursor-pointer
                    p-3 rounded-xl bg-white/5 hover:bg-white/10
                    hover:scale-[1.05] hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]
                    transition-all duration-300 group"
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover shadow-md border border-gray-600 group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-white/40 transition-all duration-300"></div>
                </div>
                <span className="text-base sm:text-lg font-medium tracking-wide group-hover:text-white transition-colors duration-300">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Search Overlay */}
        <MobileSearchOverlay
          isSearchOpen={isMobileSearchOpen}
          setIsSearchOpen={setIsMobileSearchOpen}
        />

        {/* Login Modal (Mobile) - Redundant but kept for structure, already rendered outside mobile div */}
        {/* {open && <Login setOpen={setOpen} onLoginSuccess={handleLoginSuccess} />} */}
      </div>
    </>
  );
};

export default Header;
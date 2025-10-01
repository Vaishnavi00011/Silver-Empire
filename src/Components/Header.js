import React, { useState, useEffect } from 'react';
import { Search, Mic, User, Store, Heart, ShoppingBag, Menu, X, Diamond, Gem, Sparkles, Clock, Star, Gift } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import Earing from "../assets/Images/Mask group (4).png";
import Pendants from "../assets/Images/Mask group (7).png";
import Mangalsutra from "../assets/Images/50D3PTYKEAA29_1 1.png";
import Rings from "../assets/Images/Mask group (5).png";
import Logo from "../assets/Logo/PNG-01-01-e1741102611213 (1) 1.png"
import { Link } from 'react-router-dom';

const categories = [
  { 
    section: 'Left', 
    items: [
      { name: 'Rings', image: Rings },
      { name: 'Earrings', image: Earing },
      { name: 'Bracelets', image: Rings },

      { name: 'Bangles', image: Pendants },
      { name: 'Chains', image: Pendants },
    ] 
  },
  { 
    section: 'Right', 
    items: [
      { name: 'Pendants', image: Pendants },
      { name: 'Mangalsutra', image: Mangalsutra },
      { name: 'Necklaces', image: Pendants },
      { name: 'Nose Pin', image: Earing },
      { name: 'Necklace Set', image: Pendants },
    ] 
  },
];

const defaultImage = Rings;

const CategoriesDropdown = () => {




  const [hoveredImage, setHoveredImage] = useState(defaultImage);
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
          <ul className="space-y-2 text-sm font-medium font-[Poppins] tracking-wide">
            {categories[0].items.map(item => (
              <li 
                key={item.name} 
                onMouseEnter={() => setHoveredImage(item.image)}
                onMouseLeave={() => setHoveredImage(defaultImage)}
                className="cursor-pointer relative transition-all duration-300 hover:text-red-700 hover:border-b-2 hover:border-red-700 whitespace-nowrap"
              >
                {item.name}
              </li>
            ))}
          </ul>
          <ul className="space-y-2 text-sm font-medium font-[Poppins] tracking-wide">
            {categories[1].items.map(item => (
              <li 
                key={item.name} 
                onMouseEnter={() => setHoveredImage(item.image)}
                onMouseLeave={() => setHoveredImage(defaultImage)}
                className="cursor-pointer relative transition-all duration-300 hover:text-red-700 hover:border-b-2 hover:border-red-700 whitespace-nowrap"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="pl-6 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-[180px] h-[220px] rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={hoveredImage}
              alt="Jewelry Example"
              className="w-full h-full object-cover transition-all duration-500"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const Header = () => {

    // ---------------------mobile header----------------------
  const [isMenuOpen, setIsMenuOpen] = useState(false);
   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);


  // ---------------------desktop--------------------
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const allCategories = [...categories[0].items, ...categories[1].items].map(i => i.name);

  useEffect(() => {
    if (searchValue === "") {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % allCategories.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [allCategories.length, searchValue]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <>
      {/* ================= DESKTOP HEADER (EXACT SAME) ================= */}
      <header className="bg-gray-950 text-white hidden md:block">
        <div className="flex items-center justify-between px-[12%] py-2">
          <Link to={"/"}>
          <div className="flex items-center space-x-3">
            <img src={Logo} className='w-20' alt="Logo"/>
          </div></Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8 relative">
            <div className="flex rounded-full overflow-hidden border border-gray-300">
              <div className="bg-white px-4 py-2 flex items-center justify-center">
                <span className="text-black text-sm font-medium">Search</span>
              </div>
              <div className="flex items-center bg-gray-950 px-4 py-2 flex-1 relative">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Shop for "
                  className="w-full bg-transparent outline-none text-sm text-white placeholder-gray-400"
                />
                {searchValue === "" && (
                  <div className="absolute left-[78px] top-1/2 -translate-y-1/2 text-white text-sm font-medium pointer-events-none">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={allCategories[currentIndex]}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                      >
                        {allCategories[currentIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                )}
                <div className="flex items-center pl-3 ml-3 border-l border-gray-500">
                  <Mic className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <User size={22} className="cursor-pointer hover:text-gray-400" />
            <Store size={22} className="cursor-pointer hover:text-gray-400" />
            <Heart size={22} className="cursor-pointer hover:text-gray-400" />
            <ShoppingBag size={22} className="cursor-pointer hover:text-gray-400" />
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
                {isDropdownOpen && <CategoriesDropdown />}
              </AnimatePresence>
            </div>

            <div className="flex space-x-20">
  {/* RINGS */}
  <div 
    className="relative"
    // onMouseEnter={() => setIsDropdownOpen(true)}
    // onMouseLeave={() => setIsDropdownOpen(false)}
  >
    <Link to={'/rings'}>
      <div className="flex items-center space-x-1.5 text-sm font-medium hover:text-gray-300 cursor-pointer">
        <Diamond className="w-4 h-4" />
        <span>Rings</span>
      </div>
    </Link>

    {/* <AnimatePresence>
      {isDropdownOpen && <CategoriesDropdown />}
    </AnimatePresence> */}
  </div>

  {/* Earrings */}
  <Link to={'/earings'}>
    <div className="flex items-center space-x-1.5 text-sm font-medium hover:text-gray-300 cursor-pointer">
      <Gem className="w-4 h-4" />
      <span>Earrings</span>
    </div>
  </Link>

  {/* Bracelets */}
  <Link to={'/bracelate'}>
    <div className="flex items-center space-x-1.5 text-sm font-medium hover:text-gray-300 cursor-pointer">
      <Sparkles className="w-4 h-4" />
      <span>Bracelets</span>
    </div>
  </Link>

  {/* Daily wear */}
  <Link to={'/daily-wear'}>
    <div className="flex items-center space-x-1.5 text-sm font-medium hover:text-gray-300 cursor-pointer">
      <Clock className="w-4 h-4" />
      <span>Daily wear</span>
    </div>
  </Link>

  {/* Collection */}
  <Link to={"/collection"}>
    <div className="flex items-center space-x-1.5 text-sm font-medium hover:text-gray-300 cursor-pointer">
      <Star className="w-4 h-4" />
      <span>Collection</span>
    </div>
  </Link>

  {/* Gifts */}
  <Link to={"/gift"}>
    <div className="flex items-center space-x-1.5 text-sm font-medium hover:text-gray-300 cursor-pointer">
      <Gift className="w-4 h-4" />
      <span>Gifts</span>
    </div>
  </Link>
</div>

          </div>
        </nav>
      </header>

      {/* ================= MOBILE HEADER ================= */}
      <div className="bg-gray-950 text-white md:hidden relative">
      {/* Top section: Logo + Hamburger + Right icons */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-2">
          <div onClick={toggleMenu} className="cursor-pointer">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
          <img src={Logo} className='w-16' alt="Logo"/>

        </div>

        <div className="flex items-center space-x-3">
          <Search size={20} className="cursor-pointer" />
          <User size={18} className="cursor-pointer hover:text-gray-400" />
          <Store size={18} className="cursor-pointer hover:text-gray-400" />
          <Heart size={18} className="cursor-pointer hover:text-gray-400" />
          <ShoppingBag size={18} className="cursor-pointer hover:text-gray-400" />
        </div>
      </div>

      {/* Slide-in menu from left */}
 <div
  className={`fixed top-0 left-0 h-full w-[300px] 
    bg-black/80 backdrop-blur-xl text-white 
    z-50 shadow-[0_0_25px_rgba(255,255,255,0.1)] 
    border-r border-gray-700/40
    transform transition-transform duration-500 ease-in-out
    ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
>
  {/* Close button */}
  <div className="flex justify-end p-4 border-b border-gray-700/40">
    <X
      size={26}
      className="cursor-pointer text-gray-400 hover:text-white hover:rotate-90 hover:scale-110 transition-all duration-500"
      onClick={toggleMenu}
    />
  </div>

  {/* Title */}
  <div className="px-6 py-5 border-b border-gray-700/40 relative">
    <h2 className="text-2xl font-bold flex items-center gap-3">
      <span className="bg-gradient-to-r from-gray-200 via-white to-gray-400 bg-clip-text text-transparent drop-shadow-sm">
        All Categories
      </span>
    </h2>

    {/* Animated underline shimmer */}
    <div className="absolute bottom-0 left-6 w-28 h-[3px] bg-gradient-to-r from-gray-500 via-white to-gray-500 rounded-full animate-[shimmer_2s_infinite]" />
  </div>

  {/* Categories list */}
  <div className="px-6 py-6 space-y-5 overflow-y-auto h-[calc(100%-128px)] custom-scroll">
    {categories.flatMap(cat => cat.items).map(item => (
      <div
        key={item.name}
        className="flex items-center gap-4 cursor-pointer 
          p-3 rounded-xl bg-white/5 hover:bg-white/10 
          hover:scale-[1.05] hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] 
          transition-all duration-300 group"
      >
        <div className="relative">
          <img
            src={item.image}
            alt={item.name}
            className="w-12 h-12 rounded-xl object-cover shadow-md border border-gray-600 group-hover:scale-110 transition-transform duration-300"
          />
          {/* White glow border */}
          <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-white/40 transition-all duration-300"></div>
        </div>
        <span className="text-base font-medium tracking-wide group-hover:text-white transition-colors duration-300">
          {item.name}
        </span>
      </div>
    ))}
  </div>
</div>




    </div>
  

    </>
  );
};

export default Header;

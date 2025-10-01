import React from "react";
import { motion } from "framer-motion";
import Nacklace from "../assets/Images/3pcs Luxury Black Teardrop Earrings & Necklace Set For Women, Gorgeous Jewelry Set For Banquet And Wedding 1.png";
import Harry from "../assets/Images/💎Harry Winston💎 1 (1).png";

const SilverEmpireCollectionFinal = ({ necklaceImagePath, earringImagePath }) => {
  return (
    // Outer container
    <div className="flex justify-center items-center p-6 sm:p-8 min-h-screen">
      {/* === Main Card Container === */}
      <motion.div
        className="max-w-5xl w-full bg-white flex flex-col md:flex-row md:items-stretch gap-4 sm:gap-6 md:gap-8"
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* === Left: Necklace Image === */}
        <motion.div
          className="w-full md:w-5/12"
          initial={{ x: -80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src={necklaceImagePath || Nacklace}
            alt="Model wearing Silver Empire Necklace Set"
            className="w-full h-[250px] sm:h-[350px] md:h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none shadow-2xl"
          />
        </motion.div>

        {/* === Middle: Text Content === */}
        <motion.div
          className="w-full md:w-[30%] p-6 sm:p-10 flex flex-col justify-center text-center md:text-left"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 text-gray-900">
            Silver Empire
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-700">
            Collection
          </h2>

          <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base max-w-sm mx-auto md:mx-0">
            Discover the essence of elegance with our latest silver jewellery
            line, featuring three individuality.
          </p>

          <h3 className="text-lg sm:text-xl font-bold mb-8 text-gray-900">
            Best Gift for your Loved One
          </h3>

          {/* Shop Now Button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-black to-gray-900 
                       text-white px-8 sm:px-10 py-3 rounded-full text-base sm:text-lg font-semibold 
                       shadow-lg transition-all duration-500 hover:shadow-xl"
          >
            <span className="relative z-10">Shop Now</span>
            <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
                             opacity-0 hover:opacity-30 transition duration-500 rounded-full" />
          </motion.button>
        </motion.div>

        {/* === Right: Earring + Price === */}
        <motion.div
          className="w-full md:w-[30%] flex justify-center md:justify-start py-6 md:py-10"
          initial={{ x: 80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div
            className="w-36 sm:w-40 bg-white rounded-xl text-center"
            whileHover={{ y: -10, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {/* Earring Image Box */}
            <div
              className="w-full h-36 sm:h-40 lg:mt-12 bg-blue-900 rounded-xl shadow-xl overflow-hidden border border-white"
              style={{
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              }}
            >
              <motion.img
                src={earringImagePath || Harry}
                alt="Silver Earring with Blue Stone"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1, rotate: 2 }}
                transition={{ duration: 0.4 }}
              />
            </div>

            {/* Price Tag */}
            <div className="mt-3">
              <p className="text-gray-800 font-medium text-sm sm:text-base">
                Silver Earring
              </p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">
                $ 3000
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SilverEmpireCollectionFinal;

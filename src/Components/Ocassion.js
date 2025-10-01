import React from "react";
import { motion } from "framer-motion";
import Gift from "../assets/Videos/4783592_Wedding_Rings_1920x1080.mp4";
import DailyWear from "../assets/Videos/6763320-uhd_2160_3840_25fps.mp4";

const OccasionPage = () => {
  return (
    <div className="w-full min-h-screen font-sans overflow-hidden">
      {/* Heading */}
      <motion.div
        className="text-center py-10"
        initial={{ opacity: 0, y: 20, rotateX: 15 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1 }}
      >
       

        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold text-gray-800 mb-2">
          Silver Empire World
</h2>
<p className="text-sm sm:text-base md:text-lg font-serif text-gray-600">
          A companion for every occasion
</p>
      </motion.div>

      {/* 2 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-16 pb-10">
        {/* Gifts Section (Left) */}
        <motion.div
          className="relative w-full h-[90vh] rounded-2xl overflow-hidden  group cursor-pointer"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.03 }}
        >
          <video
            src={Gift}
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:brightness-110"
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Gradient + Sparkle Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
            <div className="absolute w-full h-full pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <span
                  key={i}
                  className="absolute bg-white rounded-full opacity-30 w-1 h-1 animate-sparkle"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                ></span>
              ))}
            </div>
          </div>

          {/* Button centered bottom */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.button
              className="relative flex items-center gap-3 px-8 py-3 border-2 border-white text-white font-semibold text-lg rounded-full overflow-hidden shadow-lg hover:shadow-[0_0_20px_#fff]"
              whileHover={{ scale: 1.1 }}
            >
              <span className="relative z-10 animate-pulse text-lg md:text-xl">
                Gifts
              </span>
              <span className="relative z-10 text-2xl transition-transform duration-300 group-hover:translate-x-3">
                ➔
              </span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-full"></span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Daily Wear Section (Right) */}
        <motion.div
          className="relative w-full h-[90vh] rounded-2xl overflow-hidden  group cursor-pointer"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.03 }}
        >
          <video
            src={DailyWear}
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:brightness-110"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
            <div className="absolute w-full h-full pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <span
                  key={i}
                  className="absolute bg-white rounded-full opacity-30 w-1 h-1 animate-sparkle"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                ></span>
              ))}
            </div>
          </div>

          {/* Button centered bottom */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.button
              className="relative flex items-center gap-3 px-8 py-3 border-2 border-white text-white font-semibold text-lg rounded-full overflow-hidden shadow-lg hover:shadow-[0_0_20px_#fff]"
              whileHover={{ scale: 1.1 }}
            >
              <span className="relative z-10 animate-pulse text-lg md:text-xl">
                Daily Wear
              </span>
              <span className="relative z-10 text-2xl transition-transform duration-300 group-hover:translate-x-3">
                ➔
              </span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-full"></span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Sparkle Keyframes */}
      <style>
        {`
          @keyframes sparkle {
            0% { opacity: 0; transform: scale(0); }
            50% { opacity: 0.5; transform: scale(1.2); }
            100% { opacity: 0; transform: scale(0); }
          }
          .animate-sparkle {
            animation: sparkle 2s infinite;
          }
        `}
      </style>
    </div>
  );
};

export default OccasionPage;

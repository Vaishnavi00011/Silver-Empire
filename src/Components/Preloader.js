import React from "react";
import { motion } from "framer-motion";
import { FaGem } from "react-icons/fa";

// Variants for sequential animation
const containerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const SilverEmpireSparkleLoader = () => {
  return (
    // Background: Deep dark blue/black for max contrast and premium feel
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#1a1a2e]">
      
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="flex flex-col items-center"
      >
        
        {/* Animated Diamond/Gem Icon: Stronger Glow and Motion */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1], // More pronounced pulse
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear", // Linear for rotation, better for gem-cut
          }}
          // Crystal Blue/Silver Color with a strong, sparkling glow
          className="text-[#B0E0E6] text-6xl drop-shadow-[0_0_25px_rgba(176,224,230,0.8)]"
        >
          <FaGem />
        </motion.div>

        {/* Brand Name: Silver Empire */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-8 text-4xl tracking-widest font-extrabold uppercase relative"
        >
          {/* Shimmer/Glow Text Effect */}
          <span className="bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent drop-shadow-[0_0_8px_#E0E0E0] animate-pulse-slow">
            Silver Empire
          </span>
        </motion.h1>

        {/* Sub-text: Catchphrase */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="mt-2 text-sm tracking-[0.3em] font-medium uppercase text-gray-500"
        >
          DARE TO SHINE. DARE TO RULE.
        </motion.p>

        {/* Pulsing Dot Loader */}
        <div className="flex space-x-2 mt-10">
          {[0, 0.2, 0.4].map((delay, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut",
              }}
              className="w-3 h-3 bg-[#B0E0E6] rounded-full drop-shadow-md"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SilverEmpireSparkleLoader;
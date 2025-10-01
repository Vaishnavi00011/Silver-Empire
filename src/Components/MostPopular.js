import React from "react";
import { motion } from "framer-motion";
import maskGroup from "../assets/Images/Mask group (3).png";
import maskGroup2 from "../assets/Images/Mask group (4).png";
import maskGroup3 from "../assets/Images/Mask group (5).png";

// Jewellery categories data
const jewelleryCategories = [
  {
    name: "PENDANTS",
    description: "A delicate teardrop pendant with a blue crystal.",
    imageUrl: maskGroup,
    alt: "Silver teardrop pendant with blue crystal",
  },
  {
    name: "EARRINGS",
    description: "Gold-plated drop earrings with white pearl accents.",
    imageUrl: maskGroup2,
    alt: "Gold drop earrings with white pearls",
  },
  {
    name: "RINGS",
    description: "An adjustable silver ring with a small butterfly design.",
    imageUrl: maskGroup3,
    alt: "Silver ring with blue butterfly design",
  },
];

// Card Component
const JewelleryCard = ({ name, imageUrl, alt }) => {
  return (
    <motion.div
      className="flex flex-col items-center w-[90%] sm:w-[280px] max-w-[95vw]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.05, rotate: 1 }}
    >
      {/* Image Container */}
      <div className="w-full h-[220px] sm:h-[280px] md:h-[300px] overflow-hidden rounded-xl shadow-lg">
        <motion.img
          src={imageUrl}
          alt={alt}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />
      </div>
      {/* Category Name */}
      <motion.p
        className="mt-3 sm:mt-4 text-sm sm:text-lg font-serif tracking-widest uppercase text-gray-800 font-medium text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {name}
      </motion.p>
    </motion.div>
  );
};

// Main Section
const PopularJewellery = () => {
  return (
    <div className="py-10 px-4 sm:px-6 md:px-8 bg-white font-sans">
      {/* Title Section */}
      <motion.div
        className="text-center mb-8 sm:mb-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
       <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold text-gray-800 mb-2">
  Most Popular
</h2>
<p className="text-sm sm:text-base md:text-lg font-serif text-gray-600">
  Jewellery pieces everyone's eyeing right now
</p>

      </motion.div>

      {/* Cards Container */}
      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8">
        {jewelleryCategories.map((item) => (
          <JewelleryCard
            key={item.name}
            name={item.name}
            imageUrl={item.imageUrl}
            alt={item.alt}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularJewellery;

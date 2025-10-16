import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// Card Component
const JewelleryCard = ({ name, imageUrl, alt }) => (
  <motion.div
    className="flex flex-col items-center w-[90%] sm:w-[45%] md:w-[280px] max-w-[95vw]"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    whileHover={{ scale: 1.05, rotate: 1 }}
  >
    <div className="w-full h-[220px] sm:h-[260px] md:h-[300px] overflow-hidden rounded-xl shadow-lg">
      <motion.img
        src={imageUrl}
        alt={alt || name}
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.4 }}
      />
    </div>
    <motion.p
      className="mt-3 sm:mt-4 text-base sm:text-lg font-serif tracking-widest uppercase text-gray-800 font-medium text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      {name}
    </motion.p>
  </motion.div>
);

// Main Section
const PopularJewellery = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [current, setCurrent] = useState(0);
  const [jewelleryCategories, setJewelleryCategories] = useState([]);

  // ✅ Handle resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Fetch featured products from API
  useEffect(() => {
   const fetchFeatured = async () => {
  try {
    const res = await axios.get(
      "http://91.108.105.41:8000/api/products/featured/"
    );

    const products = res.data.results.slice(0, 3).map((item) => ({
      name: item.name,
      imageUrl: item.primary_image?.image
        ? `http://91.108.105.41:8000${item.primary_image.image}`
        : "", // अगर image null हो तो empty string
      alt: item.primary_image?.alt_text || item.name,
    }));

    setJewelleryCategories(products);
  } catch (error) {
    console.error("Failed to fetch featured products:", error);
  }
};

    fetchFeatured();
  }, []);

  // ✅ Auto-slide for mobile
  useEffect(() => {
    if (isMobile && jewelleryCategories.length > 0) {
      const interval = setInterval(() => {
        setCurrent((prev) =>
          prev === jewelleryCategories.length - 1 ? 0 : prev + 1
        );
      }, 3000); // 3 seconds per slide
      return () => clearInterval(interval);
    }
  }, [isMobile, jewelleryCategories]);

  return (
    <div className="px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center font-sans lg:mt-16 mt-14">
      {/* Title */}
      <motion.div
        className="text-center mb-6 sm:mb-10 px-2"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-lg sm:text-2xl md:text-3xl font-serif font-semibold text-gray-800 mb-1 sm:mb-2">
          Most Popular
        </h2>
        <p className="text-sm sm:text-base md:text-lg font-serif text-gray-600">
          Jewellery pieces everyone's eyeing right now
        </p>
      </motion.div>

      {/* Mobile Carousel */}
      {isMobile ? (
        <div className="relative w-full flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {jewelleryCategories.length > 0 && (
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.6 }}
                className="flex justify-center w-full"
              >
                <JewelleryCard {...jewelleryCategories[current]} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        // Desktop Grid
        <div className="flex flex-wrap justify-center gap-5 sm:gap-6 md:gap-8 w-full max-w-6xl">
          {jewelleryCategories.map((item) => (
            <JewelleryCard
              key={item.name}
              name={item.name}
              imageUrl={item.imageUrl}
              alt={item.alt}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularJewellery;






// import React from "react";
// import { motion } from "framer-motion";
// import maskGroup from "../assets/Images/Mask group (3).webp";
// import maskGroup2 from "../assets/Images/Mask group (4).webp";
// import maskGroup3 from "../assets/Images/Mask group (5).webp";

// const products = [
//   { name: "PENDANTS", image: maskGroup },
//   { name: "EARRINGS", image: maskGroup2 },
//   { name: "RINGS", image: maskGroup3 },
// ];

// const PopularJewellery = () => {
//   return (
//     <div className="relative px-4 sm:px-6 md:px-12 lg:px-20 lg:mt-28 mt-14 bg-white flex flex-col items-center">
//       {/* Section Title */}
//       <motion.div
//         className="text-center mb-12 sm:mb-16"
//         initial={{ opacity: 0, y: -30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.8 }}
//       >
//         <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-black mb-2">
//           Most Popular
//         </h1>
//         <p className="text-gray-600 font-serif text-sm sm:text-base">
//           Jewellery pieces everyone's eyeing right now
//         </p>
//       </motion.div>

//       {/* Products */}
//       <div className="relative w-full flex flex-row md:flex-row justify-between md:justify-center items-center gap-4 md:gap-10">
//         {products.map((product, index) => {
//           // Desktop positions
//           const positionsDesktop = [
//             { x: "-140px", y: 20, scale: 1, z: 5, rotate: -5 },
//             { x: "0px", y: 0, scale: 1.2, z: 10, rotate: 0 },
//             { x: "140px", y: 20, scale: 1, z: 5, rotate: 5 },
//           ];

//           const pos = positionsDesktop[index];

//           return (
//             <motion.div
//               key={index}
//               className="relative cursor-pointer rounded-full overflow-hidden shadow-2xl flex-shrink-0
//                          w-24 h-24 md:w-60 md:h-60"
//               style={{ zIndex: pos.z }}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: pos.y }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, delay: index * 0.2 }}
//               whileHover={{
//                 scale: pos.scale + 0.15,
//                 y: pos.y - 10,
//               }}
//             >
//               {/* Product Image */}
//               <motion.img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-full object-cover rounded-full"
//                 whileHover={{ scale: 1.12, rotate: pos.rotate }}
//                 transition={{ duration: 0.5 }}
//               />

//               {/* Overlay */}
//               <motion.div
//                 className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 hover:opacity-100 rounded-full transition-opacity duration-300"
//               >
//                 <h3 className="text-white text-xs sm:text-sm md:text-lg font-bold font-serif mb-1 text-center">
//                   {product.name}
//                 </h3>
//                 <motion.div
//                   className="px-2 py-1 bg-white text-black rounded-full font-semibold cursor-pointer text-xs sm:text-sm md:text-base"
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   Shop Now
//                 </motion.div>
//               </motion.div>

//               {/* Horizontal offset only on desktop */}
//               <div
//                 className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2"
//                 style={{ transform: `translateX(${pos.x})` }}
//               ></div>
//             </motion.div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default PopularJewellery;


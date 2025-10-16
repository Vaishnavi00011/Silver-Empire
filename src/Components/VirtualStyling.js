import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import ring from "../assets/Images/Mask group (5).webp";
import nacklace from "../assets/Images/3pcs Luxury Black Teardrop Earrings & Necklace Set For Women, Gorgeous Jewelry Set For Banquet And Wedding 1 (1).webp";
import earing from "../assets/Images/13 1.webp";

const lookbookData = {
  title: "Styled By You: Lookbook",
  subtitle:
    "Explore how to mix and match our pure silver pieces for every occasion, from subtle daily wear to dazzling evening looks.",
  ctaText: "Shop All Styled Looks",
  ctaLink: "/shop/all-looks",
  images: [
    { src: ring, alt: "Minimalist Silver Rings Stack" },
    { src: nacklace, alt: "Layered Silver Necklaces" },
    { src: earing, alt: "Statement Silver Earrings" },
  ],
};

const StackedGalleryLookbook = () => {
  const imageVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <section className="mt-14 lg:mt-28 bg-white">
      <div className="container mx-auto px-4">

        {/* ================= Desktop View ================= */}
        <div className="hidden lg:grid grid-cols-5 gap-12 items-center">
          {/* Left Side: Text */}
          <div className="col-span-2">
            <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-2">
              Inspiration
            </h2>
            <h3 className="text-4xl font-serif text-gray-800 mb-6">
              {lookbookData.title}
            </h3>
            <p className="text-base text-gray-600 mb-8 leading-relaxed">
              {lookbookData.subtitle}
            </p>

            {/* ✅ Corrected Link */}
            <Link
              to="/collection"
              className="inline-block text-base font-semibold text-gray-800 border-b border-gray-800 pb-1 hover:border-gray-500 transition-colors"
            >
              {lookbookData.ctaText} →
            </Link>
          </div>

          {/* Right Side: Stacked Animated Images */}
          <div className="col-span-3 relative h-[500px]">
            {lookbookData.images.map((img, idx) => (
              <motion.img
                key={idx}
                src={img.src}
                alt={img.alt}
                className={`absolute object-cover rounded-xl shadow-2xl ${
                  idx === 0
                    ? "top-0 left-0 w-3/4 h-3/4 shadow-xl"
                    : idx === 1
                    ? "top-1/4 right-0 w-2/3 h-2/3 border-4 border-white"
                    : "bottom-0 left-1/4 w-1/2 h-1/2 border-4 border-white"
                }`}
                style={{ zIndex: (idx + 1) * 10 }}
                variants={imageVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.3 }}
                transition={{ duration: 1, ease: "easeOut", delay: idx * 0.3 }}
                whileHover={{
                  scale: 1 + 0.05 * (idx + 1),
                  rotate: idx % 2 === 0 ? -2 : 2,
                }}
              />
            ))}
          </div>
        </div>

        {/* ================= Mobile View ================= */}
        <div className="block lg:hidden text-center mt-14 relative overflow-hidden">
          <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-2">
            Inspiration
          </h2>
          <h3 className="text-2xl font-serif text-gray-800 mb-4">
            {lookbookData.title}
          </h3>
          <p className="text-sm text-gray-600 mb-6 leading-relaxed px-4">
            {lookbookData.subtitle}
          </p>

          <div className="relative w-full h-[400px] sm:h-[450px] flex justify-center items-center">
            {lookbookData.images.map((img, idx) => (
              <motion.img
                key={idx}
                src={img.src}
                alt={img.alt}
                className={`absolute object-cover rounded-xl shadow-2xl ${
                  idx === 0
                    ? "top-0 left-0 w-[70%] sm:w-[65%]"
                    : idx === 1
                    ? "top-1/4 right-0 w-[65%] sm:w-[60%] border-4 border-white"
                    : "bottom-0 left-1/4 w-[45%] sm:w-[40%] border-4 border-white"
                }`}
                style={{ zIndex: (idx + 1) * 10 }}
                variants={imageVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, ease: 'easeOut', delay: idx * 0.3 }}
                whileHover={{
                  scale: 1 + 0.05 * (idx + 1),
                  rotate: idx % 2 === 0 ? -1 : 2,
                }}
              />
            ))}
          </div>

          {/* ✅ Mobile CTA */}
          <Link
            to="/collection"
            className="inline-block mt-8 text-sm font-semibold text-gray-800 border-b border-gray-800 pb-1 hover:border-gray-500 transition-colors"
          >
            {lookbookData.ctaText} →
          </Link>
        </div>

      </div>
    </section>
  );
};

export default StackedGalleryLookbook;

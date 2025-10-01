import React from 'react';
import { motion } from 'framer-motion';
import ring from "../assets/Images/Mask group (5).png"
import nacklace from "../assets/Images/3pcs Luxury Black Teardrop Earrings & Necklace Set For Women, Gorgeous Jewelry Set For Banquet And Wedding 1.png"
import earing from "../assets/Images/13 1.png"

const lookbookData = {
  title: "Styled By You: Lookbook",
  subtitle: "Explore how to mix and match our pure silver pieces for every occasion, from subtle daily wear to dazzling evening looks.",
  ctaText: "Shop All Styled Looks",
  ctaLink: "/shop/all-looks",
  images: [
    { src: ring, alt: "Minimalist Silver Rings Stack" },
    { src: nacklace, alt: "Layered Silver Necklaces" },
    { src: earing, alt: "Statement Silver Earrings" },
  ],
};

const StackedGalleryLookbook = () => {
  // Animation variants
  const imageVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 items-center">

          {/* Left Side: Text */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-2">
              Inspiration
            </h2>
            <h3 className="text-4xl font-serif text-gray-800 mb-6">
              {lookbookData.title}
            </h3>
            <p className="text-base text-gray-600 mb-8 leading-relaxed">
              {lookbookData.subtitle}
            </p>

            <a
              href={lookbookData.ctaLink}
              className="inline-block text-base font-semibold text-gray-800 border-b border-gray-800 pb-1 hover:border-gray-500 transition-colors"
            >
              {lookbookData.ctaText} →
            </a>
          </div>

          {/* Right Side: Animated Stacked Images */}
          <div className="lg:col-span-3 order-1 lg:order-2 relative h-[500px]">
            
            {/* Image 1 */}
            <motion.img
              src={lookbookData.images[0].src}
              alt={lookbookData.images[0].alt}
              className="absolute top-0 left-0 w-3/4 h-3/4 object-cover shadow-xl rounded-xl"
              style={{ zIndex: 10 }}
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.3 }}
              transition={{ duration: 1, ease: "easeOut" }}
              whileHover={{ scale: 1.05, rotate: -2 }}
            />

            {/* Image 2 */}
            <motion.img
              src={lookbookData.images[1].src}
              alt={lookbookData.images[1].alt}
              className="absolute top-1/4 right-0 w-2/3 h-2/3 object-cover shadow-2xl rounded-xl"
              style={{ zIndex: 20, border: '4px solid white' }}
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.3 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              whileHover={{ scale: 1.08, rotate: 2 }}
            />

            {/* Image 3 */}
            <motion.img
              src={lookbookData.images[2].src}
              alt={lookbookData.images[2].alt}
              className="absolute bottom-0 left-1/4 w-1/2 h-1/2 object-cover shadow-2xl rounded-xl"
              style={{ zIndex: 30, border: '4px solid white' }}
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.3 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
              whileHover={{ scale: 1.1, rotate: -1 }}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default StackedGalleryLookbook;

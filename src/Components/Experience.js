import React from "react";
import { motion } from "framer-motion";
import watsapp1 from "../assets/Images/WhatsApp Image 2025-07-19 at 01.11.44 (1) 1.webp";
import watsapp2 from "../assets/Images/WhatsApp Image 2025-07-19 at 01.11.44 1.webp";
import watsapp3 from "../assets/Images/WhatsApp Image 2025-07-19 at 01.11.45 1.webp";

const images = {
  mainBuilding: watsapp3,
  interiorLuxury: watsapp1,
  customerView: watsapp2,
};

const SilverEmpireExperience = () => {
  return (
    <section className="mt-14 lg:mt-28 px-4 sm:px-6 bg-white font-sans">
      {/* Desktop Section */}
      <div className="hidden md:block">
        <h1 className="text-2xl sm:text-3xl md:text-3xl font-serif font-semibold text-center  text-gray-900 leading-snug">
Step Into the Shine</h1>
<p className="mb-8 mt-2 text-center justify-center font-serif text-gray-600">A journey through artistry and allure</p>


        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-10 items-stretch">
          {/* Left Image */}
          <motion.div
            className="relative overflow-hidden rounded-2xl shadow-2xl h-[650px]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={images.mainBuilding}
              alt="Silver Empire Main Building"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </motion.div>

          {/* Right Stacked Images */}
          <div className="flex flex-col gap-10 h-[650px]">
            <motion.div
              className="relative overflow-hidden rounded-2xl shadow-2xl flex-1"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src={images.interiorLuxury}
                alt="Luxury Interior View"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>

            <motion.div
              className="relative overflow-hidden rounded-2xl shadow-2xl flex-1"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <img
                src={images.customerView}
                alt="Customers in the Store"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Section */}
      <div className="md:hidden">
        <h1 className="text-2xl sm:text-3xl md:text-3xl font-serif font-semibold text-center  text-gray-900 leading-snug">
Step Into the Shine</h1>
<p className="mb-8 mt-2 text-center justify-center text-sm font-serif text-gray-600">A journey through artistry and allure</p>



        <div className="flex flex-col gap-4">
          {/* Main Image */}
          <motion.div
            className="relative overflow-hidden rounded-2xl shadow-2xl h-72 sm:h-96 w-full mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={images.mainBuilding}
              alt="Silver Empire Main Building"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </motion.div>

          {/* Top Right Image */}
          <motion.div
            className="relative overflow-hidden rounded-2xl shadow-2xl h-48 sm:h-64 w-full mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src={images.interiorLuxury}
              alt="Luxury Interior View"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </motion.div>

          {/* Bottom Right Image */}
          <motion.div
            className="relative overflow-hidden rounded-2xl shadow-2xl h-48 sm:h-64 w-full mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <img
              src={images.customerView}
              alt="Customers in the Store"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SilverEmpireExperience;

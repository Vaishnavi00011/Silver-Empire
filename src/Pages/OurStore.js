import React, { useState, useRef, useEffect } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock, FaStoreAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const stores = [
  {
    id: 1,
    name: "Downtown Silver Store",
    address: "123 Main Street, New Delhi, India",
    phone: "+91 9876543210",
    timings: "Mon-Sat: 10am - 8pm",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.839!2d77.0689!3d28.5273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3a1!2sDelhi!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin",
  },
  {
    id: 2,
    name: "Uptown Silver Boutique",
    address: "45 Silver Lane, Mumbai, India",
    phone: "+91 9123456780",
    timings: "Mon-Sun: 11am - 9pm",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.0000!2d72.8777!3d19.0760!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0!2sMumbai!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin",
  },
  {
    id: 3,
    name: "Chennai Silver Hub",
    address: "77 Marina Street, Chennai, India",
    phone: "+91 9988776655",
    timings: "Mon-Fri: 10am - 7pm",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0!2d80.2707!3d13.0827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0!2sChennai!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin",
  },
];

const CustomDropdown = ({ options, selected, setSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full max-w-xs sm:max-w-sm">
      <div
        className="cursor-pointer flex justify-between items-center p-3 sm:p-4 rounded-2xl border border-gray-300 shadow-md bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selected ? "text-gray-800 font-medium" : "text-gray-400"}>
          {selected ? options.find((o) => o.id === selected).name : "Select Your Store"}
        </span>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-2xl shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option.id}
              className="p-3 sm:p-4 cursor-pointer hover:bg-gray-100 text-sm sm:text-base"
              onClick={() => {
                setSelected(option.id);
                setIsOpen(false);
              }}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const OurStorePage = () => {
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const selectedStore = stores.find((store) => store.id === selectedStoreId);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto p-6 sm:p-8">
        <h1 className="flex  sm:flex-row items-center justify-center font-serif gap-3 text-2xl sm:text-4xl font-semibold mb-4 text-gray-900 tracking-tight">
          Explore Our Stores
          <FaStoreAlt className="text-black text-2xl sm:text-4xl" />
        </h1>

        <p className="text-center text-gray-600 font-serif mb-10 text-sm sm:text-lg">
          Choose your nearest store to see location and details
        </p>

        <div className="flex justify-center mb-12">
          <CustomDropdown options={stores} selected={selectedStoreId} setSelected={setSelectedStoreId} />
        </div>

        {selectedStore && (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-300">
            <div className="flex flex-col md:flex-row md:gap-8 p-6 sm:p-8">
              <div className="flex-1 flex flex-col gap-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{selectedStore.name}</h2>
                <div className="flex items-center gap-3 text-gray-700 text-sm sm:text-base">
                  <FaMapMarkerAlt className="text-red-500 text-lg sm:text-xl" />
                  <span>{selectedStore.address}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 text-sm sm:text-base">
                  <FaPhoneAlt className="text-green-500 text-lg sm:text-xl" />
                  <span>{selectedStore.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 text-sm sm:text-base">
                  <FaClock className="text-blue-500 text-lg sm:text-xl" />
                  <span>{selectedStore.timings}</span>
                </div>
              </div>
              <div className="mt-6 md:mt-0 md:flex-1">
                <iframe
                  src={selectedStore.mapEmbed}
                  className="w-full h-72 sm:h-80 md:h-96 rounded-2xl shadow-lg border-0"
                  allowFullScreen=""
                  loading="lazy"
                  title={selectedStore.name}
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default OurStorePage;

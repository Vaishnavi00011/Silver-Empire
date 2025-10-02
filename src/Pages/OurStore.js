import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock, FaStoreAlt } from "react-icons/fa";
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

const OurStorePage = () => {
  const [selectedStoreId, setSelectedStoreId] = useState("");

  const selectedStore = stores.find((store) => store.id === Number(selectedStoreId));

  return (
    <div className=" min-h-screen">
      <Header />

      <div className="max-w-6xl mx-auto p-6">
        {/* Stylish Heading */}
<h1 className="flex items-center justify-center gap-3 text-3xl sm:text-4xl font-extrabold mb-6 text-gray-900 tracking-wide">
      Explore Our Stores

  <FaStoreAlt className="text-black text-3xl" />
</h1>
        <p className="text-center text-gray-600 mb-10 text-lg">
          Choose your nearest store to see location and details
        </p>

        {/* Store Selector */}
        <div className="flex justify-center mb-12">
          <select
            value={selectedStoreId}
            onChange={(e) => setSelectedStoreId(e.target.value)}
            className="p-3 sm:p-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black shadow-md transition w-full sm:w-72 text-gray-700 font-medium"
          >
            <option value="">Select Your Store</option>
            {stores.map((store) => (
              <option key={store.id} value={store.id}>
                {store.name}
              </option>
            ))}
          </select>
        </div>

        {/* Store Card */}
        {selectedStore && (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-300">
            <div className="md:flex md:gap-8 p-6">
              {/* Store Info */}
              <div className="flex-1 flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedStore.name}</h2>

                <div className="flex items-center gap-3 text-gray-700">
                  <FaMapMarkerAlt className="text-red-500 text-xl" />
                  <span className="text-md sm:text-lg">{selectedStore.address}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <FaPhoneAlt className="text-green-500 text-xl" />
                  <span className="text-md sm:text-lg">{selectedStore.phone}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <FaClock className="text-blue-500 text-xl" />
                  <span className="text-md sm:text-lg">{selectedStore.timings}</span>
                </div>
              </div>

              {/* Map */}
              <div className="mt-6 md:mt-0 md:flex-1">
                <iframe
                  src={selectedStore.mapEmbed}
                  className="w-full h-72 md:h-80 rounded-2xl shadow-lg border-0"
                  allowFullScreen=""
                  loading="lazy"
                  title={selectedStore.name}
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default OurStorePage;

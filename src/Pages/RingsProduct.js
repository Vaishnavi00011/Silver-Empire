import React, { useState, useRef } from "react";
import { FaMinus, FaPlus, FaHeart, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { motion } from "framer-motion";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import rings from "../assets/Images/Mask group (5).png";

const RingDetailPage = ({ ring }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(ring.sizes[0]);
  const [pincode, setPincode] = useState("");
  const [mainImage, setMainImage] = useState(rings);

  const scrollRef = useRef(null);

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => quantity > 1 && setQuantity(quantity - 1);

  const handleAddToCart = () => {
    alert(`${quantity} ${ring.name} added to cart (Size: ${selectedSize})`);
  };

  const handleBuyNow = () => {
    alert(`Proceed to buy ${quantity} ${ring.name} (Size: ${selectedSize})`);
  };

  const handleCheckPincode = () => {
    alert(`Checking delivery for pincode: ${pincode}`);
  };

const scroll = (direction) => {
  if (scrollRef.current) {
    const container = scrollRef.current;
    const thumbnailWidth = 64; // w-16 = 64px
    const gap = 8; // gap-2 = 8px
    const scrollAmount = (thumbnailWidth + gap) * 1; // scroll 1 image at a time

    container.scrollTo({
      left: direction === "left" ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  }
};




  return (
    <div>
      <Header />

      <div className="min-h-screen text-gray-900 px-4 py-12 flex flex-col md:flex-row gap-6 max-w-5xl mx-auto">
        {/* Left Side - Image + Thumbnails */}
        <motion.div
          className="md:w-1/2 flex flex-col gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Image */}
          <div className="w-full h-[450px] bg-gray-200 rounded-xl flex items-center justify-center shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-500">
            <img
              src={mainImage}
              className="w-full h-full object-cover"
              alt={ring.name}
            />
          </div>

          {/* Thumbnails Carousel */}
         <div className="relative mt-2 flex items-center">
  {/* Left Arrow */}
  {ring.additionalImages.length > 5 && (
    <button
      onClick={() => scroll("left")}
      className="absolute left-0 z-20 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
    >
      <FaChevronLeft />
    </button>
  )}

  {/* Thumbnails Container */}
  <div
    ref={scrollRef}
    className="flex overflow-hidden gap-2"
    style={{ width: "calc(16*5 + 8*4)px" }} // 5 images * w-16 + 4 gaps * 8px
  >
    {ring.additionalImages.map((img, idx) => (
      <div
        key={idx}
        onClick={() => setMainImage(img || rings)}
        className={`w-16 h-16 flex-shrink-0 rounded-md cursor-pointer border border-gray-400 hover:border-gray-600 hover:scale-110 transition transform ${
          mainImage === img ? "border-gray-900" : ""
        }`}
      >
        <img
          src={img || rings}
          alt={`Thumbnail ${idx + 1}`}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
    ))}
  </div>

  {/* Right Arrow */}
  {ring.additionalImages.length > 5 && (
    <button
      onClick={() => scroll("right")}
      className="absolute right-0 z-20 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
    >
      <FaChevronRight />
    </button>
  )}
</div>



        </motion.div>

        {/* Right Side - Details */}
        <motion.div
          className="md:w-1/2 flex flex-col mt-4 gap-3 font-sans"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Heading + Share & Like */}
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold tracking-wide text-gray-900">
              {ring.name}
            </h1>
            <div className="flex gap-2">
              <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 hover:scale-110 transition transform">
                <FaHeart className="text-red-500 text-base" />
              </button>
              <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 hover:scale-110 transition transform flex items-center gap-1 text-xs">
                <FiShare2 /> Share
              </button>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 text-yellow-500 text-sm">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-xs" />
            ))}
            <span className="text-gray-500 text-xs">(120 reviews)</span>
          </div>

          {/* Price */}
          <p className="text-base font-semibold text-gray-800">${ring.price}</p>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed text-sm">{ring.description}</p>

          {/* Material */}
          <p className="text-gray-700 font-medium text-sm">Material: {ring.material}</p>

          {/* Size Selector */}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="font-medium text-sm">Size:</span>
            {ring.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-2 py-1 border rounded-md text-sm ${
                  selectedSize === size
                    ? "bg-gray-900 text-white shadow-md"
                    : "bg-white text-gray-900 border-gray-400"
                } hover:bg-gray-900 hover:text-white hover:shadow-lg transition transform hover:-translate-y-0.5`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={decrement}
              className="p-1 border border-gray-400 rounded-md hover:bg-gray-200 transition"
            >
              <FaMinus className="text-sm" />
            </button>
            <span className="text-sm">{quantity}</span>
            <button
              onClick={increment}
              className="p-1 border border-gray-400 rounded-md hover:bg-gray-200 transition"
            >
              <FaPlus className="text-sm" />
            </button>
          </div>

          {/* Pincode Check */}
          <div className="flex items-center gap-3 mt-4">
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Enter Pincode"
              className="w-44 px-4 py-2 rounded-md border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 placeholder-gray-400 transition-all duration-300 shadow-sm"
            />
            <motion.button
              onClick={handleCheckPincode}
              whileHover={{ y: -2, boxShadow: "0px 6px 18px rgba(0,0,0,0.25)" }}
              whileTap={{ y: 1 }}
              className="px-5 py-2 bg-black text-white font-semibold rounded-full relative overflow-hidden transition-all duration-300 hover:bg-gray-900"
            >
              <span className="relative z-10">Check</span>
            </motion.button>
          </div>

          {/* Delivery info */}
          <p className="text-gray-500 text-xs mt-2">
            Free shipping • Delivery in 3-5 business days
          </p>

          {/* Add to Cart & Buy Now Buttons */}
          <div className="flex gap-3 mt-4">
            <motion.button
              onClick={handleBuyNow}
              whileHover={{ y: -2, boxShadow: "0px 6px 18px rgba(0,0,0,0.3)" }}
              whileTap={{ y: 1 }}
              className="px-5 py-2 bg-white text-black font-semibold rounded-full shadow-md relative overflow-hidden transition-all duration-300 border-2 border-black hover:bg-gray-100"
            >
              Buy Now
            </motion.button>

            <motion.button
              onClick={handleAddToCart}
              whileHover={{ y: -2, boxShadow: "0px 6px 18px rgba(0,0,0,0.3)" }}
              whileTap={{ y: 1 }}
              className="px-5 py-2 bg-gray-800 text-white font-semibold rounded-full shadow-md relative overflow-hidden transition-all duration-300 hover:bg-white hover:text-black"
            >
              Add to Cart
            </motion.button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

// Example usage
const ringData = {
  name: "Elegant Silver Ring",
  price: 149,
  description:
    "Premium silver ring with delicate design. Perfect for gifting or daily wear.",
  material: "Silver",
  sizes: ["6", "7", "8", "9"],
  image: "",
  additionalImages: ["", "", "", "", "", "", ""], // add more than 4 to see carousel arrows
};

export default function App() {
  return <RingDetailPage ring={ringData} />;
}

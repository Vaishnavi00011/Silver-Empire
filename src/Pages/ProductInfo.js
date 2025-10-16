import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaMinus, FaPlus, FaHeart, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { motion } from "framer-motion";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Login from "../Components/Login"
import ringsPlaceholder from "../assets/Images/Mask group (5).webp";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(ringsPlaceholder);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("6");
  const [pincode, setPincode] = useState("");
  const [thumbnails, setThumbnails] = useState([]);
  const [showAuth, setShowAuth] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get("http://91.108.105.41:8000/api/products/");
        const selectedProduct = res.data.results.find((p) => p.id === parseInt(id));
        if (selectedProduct) {
          const primary = selectedProduct.primary_image?.image
            ? `http://91.108.105.41:8000${selectedProduct.primary_image.image}`
            : ringsPlaceholder;
          setProduct(selectedProduct);
          setMainImage(primary);
          setThumbnails([primary]);
          setSelectedSize("6");
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => quantity > 1 && setQuantity(quantity - 1);
  const handleCheckPincode = () => alert(`Checking delivery for pincode: ${pincode}`);

  const handleAddToCart = () => {
    const cartItem = { id: product.id, name: product.name, image: mainImage, price: product.current_price, quantity, size: selectedSize };
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = existingCart.findIndex(item => item.id === product.id);
    if (existingIndex > -1) existingCart[existingIndex].quantity += quantity;
    else existingCart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert(`${product.name} added to cart! 🛒`);
    navigate("/add-cart");
  };

  const handleBuyNow = () => {
    const token = localStorage.getItem("token");
    if (!token) setShowAuth(true);
    else navigate("/buy-now", { state: { product, quantity, selectedSize } });
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      container.scrollTo({ left: direction === "left" ? container.scrollLeft - 72 : container.scrollLeft + 72, behavior: "smooth" });
    }
  };

  if (!product) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="overflow-x-hidden">
      <Header />
      <div className="min-h-screen text-gray-900 px-4 py-12 flex flex-col md:flex-row gap-6 max-w-5xl mx-auto">
        {/* Left */}
        <motion.div className="md:w-1/2 flex flex-col gap-4">
          <div className="w-full h-[450px] bg-gray-200 rounded-xl flex items-center justify-center shadow-xl overflow-hidden">
            <img src={mainImage} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 transform hover:scale-105" />
          </div>
          <div className="relative mt-2 flex items-center">
            {thumbnails.length > 5 && <button onClick={() => scroll("left")} className="absolute left-0 z-20 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"><FaChevronLeft /></button>}
            <div ref={scrollRef} className="flex overflow-hidden gap-2">
              {thumbnails.map((img, idx) => (
                <div key={idx} onClick={() => setMainImage(img)} className={`w-16 h-16 flex-shrink-0 rounded-md cursor-pointer border border-gray-400 hover:border-gray-600 hover:scale-110 transition transform ${mainImage === img ? "border-gray-900" : ""}`}>
                  <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover rounded-md" />
                </div>
              ))}
            </div>
            {thumbnails.length > 5 && <button onClick={() => scroll("right")} className="absolute right-0 z-20 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"><FaChevronRight /></button>}
          </div>
        </motion.div>

        {/* Right */}
        <motion.div className="md:w-1/2 flex flex-col mt-4 gap-3 font-sans">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold tracking-wide text-gray-900">{product.name}</h1>
            <div className="flex gap-2">
              <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 hover:scale-110 transition transform"><FaHeart className="text-red-500 text-base" /></button>
              <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 hover:scale-110 transition transform flex items-center gap-1 text-xs"><FiShare2 /> Share</button>
            </div>
          </div>

          <div className="flex items-center gap-1 text-yellow-500 text-sm">
            {[...Array(5)].map((_, i) => <FaStar key={i} className="text-xs" />)}
            <span className="text-gray-500 text-xs">(120 reviews)</span>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <p className="text-base font-semibold text-gray-800">₹{product.current_price}</p>
            {product.is_on_sale && product.discount_percentage && <p className="text-green-600 font-medium text-sm">{product.discount_percentage}% OFF</p>}
          </div>

          <p className="text-gray-600 leading-relaxed text-sm">{product.short_description || "No description available."}</p>

          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="font-medium text-sm">Size:</span>
            {["6","7","8","9"].map(size => (
              <button key={size} onClick={() => setSelectedSize(size)} className={`px-2 py-1 border rounded-md text-sm ${selectedSize===size?"bg-gray-900 text-white shadow-md":"bg-white text-gray-900 border-gray-400"} hover:bg-gray-900 hover:text-white hover:shadow-lg transition transform hover:-translate-y-0.5`}>
                {size}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-2">
            <button onClick={decrement} className="p-1 border border-gray-400 rounded-md hover:bg-gray-200 transition"><FaMinus className="text-sm" /></button>
            <span className="text-sm">{quantity}</span>
            <button onClick={increment} className="p-1 border border-gray-400 rounded-md hover:bg-gray-200 transition"><FaPlus className="text-sm" /></button>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <input type="text" value={pincode} onChange={(e)=>setPincode(e.target.value)} placeholder="Enter Pincode" className="w-44 px-4 py-2 rounded-md border border-gray-300 text-gray-900 text-sm" />
            <motion.button onClick={handleCheckPincode} whileHover={{ y:-2 }} whileTap={{ y:0 }} className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm shadow hover:bg-gray-800 transition">Check</motion.button>
          </div>

          <div className="flex items-center gap-3 mt-6">
            <div className="flex gap-3 mt-4">
  {/* Buy Now Button */}
  <motion.button
    onClick={handleBuyNow}
    whileHover={{ y: -2 }}
    whileTap={{ y: 1 }}
    className="px-5 py-2 bg-white text-black font-semibold rounded-full shadow-md border-2 border-black hover:bg-gray-100 transition-all"
  >
    Buy Now
  </motion.button>

  {/* Add to Cart Button */}
  <motion.button
    onClick={handleAddToCart}
    whileHover={{ y: -2 }}
    whileTap={{ y: 1 }}
    className="px-5 py-2 bg-gray-800 text-white font-semibold rounded-full shadow-md hover:bg-white hover:text-black transition-all"
  >
    Add to Cart
  </motion.button>
</div>
          </div>
        </motion.div>
      </div>

      {showAuth && <Login setOpen={setShowAuth} onSuccess={() => { setShowAuth(false); handleBuyNow(); }} />}
      <Footer />
    </div>
  );
};

export default ProductDetail;

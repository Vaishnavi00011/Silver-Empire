import React, { useState } from "react";
import { FaHeart, FaShoppingCart, FaRegSadTear } from "react-icons/fa";
import Ring from "../assets/Images/Mask group (5).png";
import Nacklace from "../assets/Images/3pcs Luxury Black Teardrop Earrings & Necklace Set For Women, Gorgeous Jewelry Set For Banquet And Wedding 1.png";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

// Sample wishlist products
const initialWishlistItems = [
  { id: 1, name: "Silver Ring", image: Ring, price: 1200, discount: "10%" },
  { id: 2, name: "Silver Necklace", image: Nacklace, price: 2500, discount: "15%" },
  { id: 3, name: "Diamond Earrings", image: Ring, price: 4500, discount: "20%" },
  { id: 4, name: "Gold Bracelet", image: Nacklace, price: 3500, discount: "5%" },
  { id: 5, name: "Elegant Pendant", image: Ring, price: 2800, discount: "12%" },
];

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);

  const handleRemove = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  return (
    <div>
      <Header />
      <div className="p-6">
        {/* Heading */}
        <h1 className="flex items-center justify-center gap-2 text-xl sm:text-2xl font-bold mb-8 bg-gradient-to-r from-gray-800 via-black to-gray-800 text-transparent bg-clip-text drop-shadow-md">
          Your Wishlist
          <FaHeart className="text-red-500 animate-pulse" />
        </h1>

        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-center gap-4">
            <FaRegSadTear className="text-6xl text-gray-400 animate-bounce" />
            <p className="text-xl font-semibold mb-4">Your wishlist is empty!</p>
            <Link to={"/collection"}>
            <button className="px-6 py-3 bg-black text-white rounded-xl hover:bg-white hover:text-black border border-black transition">
              Browse Products
            </button></Link>
          </div>
        ) : (
          <div className="flex gap-6 overflow-x-auto scrollbar-hide">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="relative min-w-[250px] bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 duration-300"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover"
                />

                {/* Overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition flex flex-col justify-between p-4">
                  <div className="flex justify-between items-start">
                    <span className="bg-white text-black text-xs px-2 py-1 rounded">
                      {item.discount} OFF
                    </span>
                    <button
                      className="text-red-500 text-xl"
                      onClick={() => handleRemove(item.id)}
                    >
                      <FaHeart />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">{item.name}</h3>
                    <p className="text-white font-bold text-md">₹{item.price}</p>
                    <Link to={"/buy-now"}>
                    <button className="mt-2 w-full bg-white text-black py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-black hover:text-white transition">
                      <FaShoppingCart /> Buy Now
                    </button></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default WishlistPage;

import React, { useState } from "react";
import { FaHeart, FaShoppingCart, FaRegSadTear } from "react-icons/fa";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import Login from "../Components/Login"
const getWishlist = () => {
  const data = localStorage.getItem("wishlist");
  return data ? JSON.parse(data) : [];
};

const removeFromWishlist = (id) => {
  let wishlist = getWishlist();
  wishlist = wishlist.filter((item) => item.id !== id);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
};

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState(getWishlist());
  const [openAuth, setOpenAuth] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // ✅ to store which item user clicked
  const navigate = useNavigate();

  const handleRemove = (id) => {
    removeFromWishlist(id);
    setWishlistItems(getWishlist());
  };

  const handleBuyNow = (item) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setSelectedItem(item);
      setOpenAuth(true); // open login modal
    } else {
      // ✅ already logged in → go to Buy Now page with item data
      navigate("/buy-now", { state: { product: item } });
    }
  };

  const handleAuthSuccess = () => {
    setOpenAuth(false);
    if (selectedItem) {
      navigate("/buy-now", { state: { product: selectedItem } });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <h1 className="flex items-center font-serif justify-center gap-2 text-2xl sm:text-3xl font-semibold mb-8 bg-gradient-to-r from-gray-800 via-black to-gray-800 text-transparent bg-clip-text drop-shadow-md">
          Your Wishlist
          <FaHeart className="text-red-500 animate-pulse" />
        </h1>

        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-center gap-4">
            <FaRegSadTear className="text-6xl text-gray-400 animate-bounce" />
            <p className="text-xl sm:text-2xl font-semibold mb-4">
              Your wishlist is empty!
            </p>
            <Link to={"/collection"}>
              <button className="px-6 py-3 text-sm sm:text-base bg-black text-white rounded-xl hover:bg-white hover:text-black border border-black transition">
                Browse Products
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 duration-300"
              >
                <img
                  src={
                    item.primary_image?.image
                      ? `http://91.108.105.41:8000${item.primary_image.image}`
                      : "/fallback-image.png"
                  }
                  alt={item.name}
                  className="w-full h-48 sm:h-64 md:h-64 lg:h-72 object-cover"
                />

                {/* Overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition flex flex-col justify-between p-3 sm:p-4">
                  <div className="flex justify-between items-start">
                    <span className="bg-white text-black text-xs sm:text-sm px-2 py-1 rounded">
                      {item.discount_percentage
                        ? `${item.discount_percentage}% OFF`
                        : ""}
                    </span>
                    <button
                      className="text-red-500 text-lg sm:text-xl"
                      onClick={() => handleRemove(item.id)}
                    >
                      <FaHeart />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm sm:text-md">
                      {item.name}
                    </h3>
                    <p className="text-white font-bold text-sm sm:text-md">
                      ₹{item.current_price}
                    </p>
                    <button
                      onClick={() => handleBuyNow(item)}
                      className="mt-2 w-full bg-white text-black py-2 sm:py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-black hover:text-white transition text-sm sm:text-base"
                    >
                      <FaShoppingCart /> Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />

      {/* ✅ Auth Modal opens below page */}
      {openAuth && <Login setOpen={setOpenAuth} onSuccess={handleAuthSuccess} />}
    </div>
  );
};

export default WishlistPage;

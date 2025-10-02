import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import Ring from "../assets/Images/Mask group (5).png";
import Nacklace from "../assets/Images/3pcs Luxury Black Teardrop Earrings & Necklace Set For Women, Gorgeous Jewelry Set For Banquet And Wedding 1.png";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const cartItems = [
  { id: 1, name: "Silver Ring", image: Ring, price: 1200, quantity: 1 },
  { id: 2, name: "Silver Necklace", image: Nacklace, price: 2500, quantity: 1 },
];

const AddToCartPage = () => {
  const [items, setItems] = useState(cartItems);

  const handleQuantityChange = (id, value) => {
    if (value < 1) value = 1;
    setItems(items.map(item => item.id === id ? { ...item, quantity: value } : item));
  };

  const handleRemove = (id) => setItems(items.filter(item => item.id !== id));

  const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="bg-gray-50 min-h-screen font-poppins">
      <Header />
      <div className="max-w-7xl mx-auto py-12 px-6">
        {/* Heading */}
        <h1 className={`text-center mb-12 tracking-wide drop-shadow-lg font-extrabold ${items.length > 0 ? "text-3xl md:text-4xl text-gray-900" : "text-5xl md:text-6xl text-gray-900"}`}>
          {items.length > 0 ? "Your Shopping Cart" : "Your Cart is Empty!"}
        </h1>

        {/* Empty Cart */}
        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-20">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="Empty Cart"
              className="w-32 h-32 mb-6 opacity-60"
            />
            <p className="text-gray-500 text-xl md:text-2xl mb-4 text-center">
              Looks like you haven't added any products yet.
            </p>
            <Link to="/collection">
              <button className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black border border-black transition duration-300 shadow-md hover:shadow-xl">
                Browse Products
              </button>
            </Link>
          </div>
        )}

        {/* Cart Items */}
        {items.length > 0 && (
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1 space-y-6">
              {items.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white p-6 rounded-3xl shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <img src={item.image} alt={item.name} className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-xl" />
                  <div className="flex-1 ml-6">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-900">{item.name}</h2>
                    <p className="text-gray-600 mt-1 text-lg">₹{item.price}</p>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      className="w-20 mt-2 p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
                    />
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 text-2xl hover:text-red-700 hover:scale-110 transition-transform duration-300"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-1/3 bg-white rounded-3xl shadow-md p-6 flex flex-col justify-between sticky top-24 hover:shadow-2xl transform transition-all duration-300">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700 text-lg">
                  <span>Subtotal:</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-gray-700 text-lg">
                  <span>Shipping:</span>
                  <span>₹100</span>
                </div>
                <hr className="border-gray-300" />
                <div className="flex justify-between font-bold text-xl text-gray-900">
                  <span>Total:</span>
                  <span>₹{totalAmount + 100}</span>
                </div>
              </div>
              <Link to={'/check-out'}>
                <button className="w-full py-4 bg-black text-white rounded-2xl font-semibold text-lg hover:bg-white hover:text-black border border-black transition-all duration-300 shadow-md hover:shadow-xl">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AddToCartPage;
